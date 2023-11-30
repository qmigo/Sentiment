import googleapiclient.discovery
from django.apps import apps


api_service_name = "youtube"
api_version = "v3"
DEVELOPER_KEY = "AIzaSyCP6k2vEMDGU328EFzRVIzXsL1EaxzCgKE"

youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey = DEVELOPER_KEY)


def scrape_video_info(videoId):
    if videoId == "" or videoId is None:
        return None

    # Retrieve video details
    video_request = youtube.videos().list(
        part="snippet,contentDetails,statistics",
        id=videoId
    )
    video_response = video_request.execute()

    if not video_response.get('items'):
        return None

    video_info = video_response['items'][0]['snippet']

    # Extract video information
    video_title = video_info['title']
    video_thumbnail = video_info['thumbnails']['medium']['url']
    video_description = video_info.get('description', '')
    video_likes = video_response['items'][0]['statistics'].get('likeCount', 0)
    video_rating = video_response['items'][0]['statistics'].get('likeCount', 0)  # Use likes as an indicator for rating
    info = {
        'title': video_title,
        'thumbnail': video_thumbnail,
        'description': video_description,
        'likes': video_likes,
        'rating': video_rating,
    }
    return info


def scrape_comments(videoId):

    if videoId == "" or videoId is None:
        return None
    
    request = youtube.commentThreads().list(
        part="snippet",
        videoId=videoId,
        maxResults = 10
    )
    response = request.execute()
    items = response['items']
    comments = list()

    for item in items:
        comments.append(item['snippet']['topLevelComment']['snippet']['textDisplay'])
    
    return comments

def get_sentiments(comments):
    
    if comments == None:
        return None
    
    feedback = [0,0,0]
    for comment in comments:
        classifier = apps.get_app_config('api').classifier
        response = classifier(comment)[0]['label']
        if response == 'Negative':
            feedback[0]+=1
        elif response == 'Neutral':
            feedback[1]+=1
        else:
            feedback[2]+=1
    return feedback



    
