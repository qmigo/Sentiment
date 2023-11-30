from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .classifier import *

# Create your views here.
def home(request):
    return HttpResponse("This is the home page.")

def getFeedback(request):
    
    videoId = request.GET.get('videoId',None)
    if videoId == None:
        return JsonResponse({'metric':[]})
    
    metric = [[],[]]

    comments = scrape_comments(videoId)
    if comments :
        metric[0] = get_sentiments(comments)
    
    info = scrape_video_info(videoId)
    if info:
        metric[1] = info
    
    print('hit')
    
    return JsonResponse({'metric':metric})