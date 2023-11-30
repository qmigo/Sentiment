# api/apps.py
from django.apps import AppConfig
from transformers import pipeline

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        # Load the pre-trained BERT model for sequence classification
        # Create a pipeline for text classification
        self.classifier = pipeline("text-classification", model="yj2773/hinglish11k-sentiment-analysis")
