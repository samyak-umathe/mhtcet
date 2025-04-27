from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import google.generativeai as genai

# Load cutoff data
try:
    df = pd.read_csv("cutoff_data.csv")
except FileNotFoundError:
    df = pd.DataFrame()

# Gemini API setup
API_KEY = "AIzaSyAJJ8B7WDk8kPETSiM8N6u9Jbe63bjtcvU"
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-pro')

app = FastAPI()

# CORS for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/predict")
def predict_colleges(
    score: int,
    cities: str = Query(..., description="Comma-separated city names"),
    branches: str = Query(..., description="Comma-separated branch names")
):
    if df.empty:
        return {"error": "Cutoff data not loaded. Please extract the PDF first."}
    city_list = [c.strip() for c in cities.split(",")]
    branch_list = [b.strip() for b in branches.split(",")]

    filtered = df[df['City'].isin(city_list) & df['Branch'].isin(branch_list)]
    eligible = filtered[filtered['Cutoff Score'] <= score]

    prompt = (
        f"User MHT CET score: {score}\n"
        f"Preferred cities: {', '.join(city_list)}\n"
        f"Preferred branches: {', '.join(branch_list)}\n"
        f"Eligible colleges based on cutoff:\n"
        f"{eligible[['College Name', 'City', 'Branch', 'Cutoff Score']].to_string(index=False)}\n"
        "Suggest the best fit colleges and explain the likelihood of admission."
    )

    gemini_response = model.generate_content(prompt)
    return {
        "eligible_colleges": eligible.to_dict(orient="records"),
        "gemini_recommendation": gemini_response.text
    } 