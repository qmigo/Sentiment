# api/apps.py
from django.apps import AppConfig
from transformers import pipeline
import googleapiclient.discovery


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        # Load the pre-trained BERT model for sequence classification
        # Create a pipeline for text classification
        self.classifier = pipeline("text-classification", model="yj2773/hinglish11k-sentiment-analysis")
        self.api_service_name = "youtube"
        self.api_version = "v3"
        self.DEVELOPER_KEY = "AIzaSyCP6k2vEMDGU328EFzRVIzXsL1EaxzCgKE"

        self.youtube = googleapiclient.discovery.build(
            self.api_service_name, self.api_version, developerKey = self.DEVELOPER_KEY)
