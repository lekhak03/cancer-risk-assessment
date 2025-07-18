# 🧾 Cancer Risk Assessment Questionnaire

This questionnaire collects essential data used by the app's risk assessment engine to estimate an individual's risk levels for various types of cancer.

All questions map directly to scoring models implemented in the app logic.

---

## 🔷 Basic Information

| Question | Data Type | Notes |
|---------|-----------|-------|
| What is your age? | Number | Required for all models |
| What is your biological sex? | `"male"` or `"female"` | Determines gender-specific risk calculations |
| What is your race or ethnicity? | String | Especially relevant for prostate cancer risk (e.g., African American) |
| What is your height (in cm)? | Number | Used to calculate BMI |
| What is your weight (in kg)? | Number | Used to calculate BMI |

---

## 🫁 Lung Cancer

| Question | Data Type | Notes |
|----------|-----------|-------|
| What is your smoking status? | `"never"`, `"former"`, or `"current"` | Most critical lung cancer risk factor |
| If former or current smoker, how many total pack-years? | Number | Needed for dose-based risk scoring |
| Do you have a family history of lung cancer? | `true` / `false` | Adds risk and prompts early screening |
| What is your physical activity level? | `"none"`, `"low"`, `"moderate"`, `"high"` | Protective factor |

---

## 🩺 Breast Cancer (Female Only)

| Question | Data Type | Notes |
|----------|-----------|-------|
| What age did you start menstruating (menarche)? | Number | Early onset (<12) increases risk |
| Have you ever been pregnant? If yes, how many times? | Number | Pregnancy is protective |
| Do you have a family history of breast cancer? | `true` / `false` | Major genetic risk factor |
| What is your alcohol consumption level? | `"none"`, `"light"`, `"moderate"`, `"heavy"` | Increases risk |
| Do you perform regular physical activity? | `"none"`, `"low"`, `"moderate"`, `"high"` | Protective |
| Have you ever had a mammogram? | `"never"`, `"irregular"`, `"regular"` | Screening history used for recommendations |

---

## 🧻 Colorectal Cancer

| Question | Data Type | Notes |
|----------|-----------|-------|
| Do you have a family history of colorectal cancer? | `true` / `false` | Key risk factor |
| How often do you eat red meat? | `"never"`, `"weekly"`, `"daily"` | Diet-based risk |
| How many servings of fruits and vegetables do you eat per day? | `"0-1"`, `"2-3"`, `"4+"` | Protective factor |
| What is your physical activity level? | `"none"`, `"low"`, `"moderate"`, `"high"` | Protective |
| What is your alcohol consumption level? | `"none"`, `"light"`, `"moderate"`, `"heavy"` | Risk-enhancing factor |
| Have you ever had a colonoscopy? | `"never"`, `"irregular"`, `"regular"` | Screening impact |

---

## ☀️ Skin Cancer

| Question | Data Type | Notes |
|----------|-----------|-------|
| What is your skin type? | `"1"` to `"6"` | Type 1/2 = burns easily (higher risk) |
| How much sun exposure do you get daily? | `"low"`, `"moderate"`, `"high"` | Risk factor |
| Do you have a family history of skin cancer? | `true` / `false` | Adds risk |
| What is your age? | Number | Older age increases risk |

---

## 🧬 Prostate Cancer (Male Only)

| Question | Data Type | Notes |
|----------|-----------|-------|
| Do you have a family history of prostate cancer? | `true` / `false` | Significant risk factor |
| How often do you eat red meat? | `"never"`, `"weekly"`, `"daily"` | Diet-based risk |
| What is your physical activity level? | `"none"`, `"low"`, `"moderate"`, `"high"` | Protective |
| What is your age? | Number | Major factor |
| What is your race or ethnicity? | String | African descent = higher baseline risk |

---

## 👩‍⚕️ Ovarian Cancer (Female Only)

| Question | Data Type | Notes |
|----------|-----------|-------|
| Do you have a family history of ovarian or breast cancer? | `true` / `false` | Indicates genetic susceptibility (BRCA) |
| Have you ever been pregnant? If yes, how many times? | Number | Pregnancy is protective |
| What is your age? | Number | Major factor |

---

## 🍽 Pancreatic Cancer

| Question | Data Type | Notes |
|----------|-----------|-------|
| What is your age? | Number | Age-related risk |
| What is your smoking status? | `"never"`, `"former"`, `"current"` | Major factor |
| Do you have a family history of pancreatic cancer? | `true` / `false` | Genetic risk |
| What is your BMI (from height/weight)? | Number | Obesity increases risk |

---

## 🛡️ Shared Lifestyle Fields

These values are reused across multiple risk models:

| Field | Used In |
|-------|---------|
| `smokingStatus` + `smokingPackYears` | Lung, Pancreatic |
| `alcoholConsumption` | Breast, Colorectal |
| `physicalActivity` | Lung, Breast, Colorectal, Prostate |
| `height` + `weight` (BMI) | Breast, Colorectal, Pancreatic |
| `familyHistory` object | All cancers where applicable |

---

*This questionnaire is derived from validated models including: PLCO, Gail, CCRAT, MRAT, and BOADICEA.*
