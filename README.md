# 🧬 Cancer Risk Assessment Web App

A user-friendly web app that estimates an individual's risk for various types of cancer based on scientifically validated risk factors. The app provides personalized, evidence-based recommendations for prevention and screening.

---

## 🚀 Features

- 📋 Interactive questionnaire covering:
  - Demographics
  - Medical and family history
  - Lifestyle habits
  - Genetic and environmental risk factors
- 🧠 Risk estimation for multiple cancer types (e.g. breast, colorectal, prostate, skin, lung)
- 📈 Visual feedback comparing user risk to population baseline
- ✅ Personalized action plans based on known risk-reduction strategies
- 🔒 Privacy-focused: no data storage unless explicitly enabled

---

## 🛠 Tech Stack

- TypeScript
- TailWind CSS
- Vite 

- 🔗 External risk models:
  - Gail Model
  - Tyrer-Cuzick (IBIS)
  - CanRisk (BOADICEA)
  - CCRAT
  - ACS CancerRisk360
  - Your Disease Risk by Washington University
- 📊 Charting (if applicable): Chart.js or Recharts (optional in future version)

---

## 🧾 Sample Questions Asked

- What is your age and sex?
- Do you have a family history of breast, colon, or prostate cancer?
- Have you ever smoked tobacco? For how many years?
- What is your weekly physical activity level?
- Do you consume alcohol? If so, how many drinks per week?
- Have you undergone any cancer screening tests (e.g., colonoscopy, mammogram)?
- Have you ever had a genetic test for cancer-related mutations?

*(See [QUESTIONNAIRE.md](./QUESTIONNAIRE.md) for full list)*

---

## 📈 Risk Evaluation Output

After completing the questionnaire:
- Users receive **relative risk scores** for each cancer type
- Feedback is color-coded and compared to national averages
- Prevention tips are provided based on evidence from the American Cancer Society, WHO, and peer-reviewed literature

---

## 📦 How to Run (If Forked)

```bash
# Clone the repository
git clone https://github.com/yourusername/cancer-risk-app.git
cd cancer-risk-app

# Open Bolt.new and import the project manually
# OR deploy using your preferred React/Vue/Next.js stack with integrated logic

# [Optional] To run locally:
npm install
npm run dev
