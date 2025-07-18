import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { UserData } from '../types/UserData';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';

interface QuestionnaireProps {
  onComplete: (data: UserData) => void;
  onBack: () => void;
  darkMode: boolean;
}

type Question = {
  id: string;
  title: string;
  type: 'number' | 'radio' | 'checkbox' | 'text';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  subtitle?: string;
  // The following line fixes the error:
  condition?: (data: UserData) => boolean;
  defaultValue?: any;
};

type Section = {
  title: string;
  questions: Question[];
};

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete, onBack, darkMode }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userData, setUserData] = useState<UserData>({});

  const sections: Section[] = [
    {
      title: 'Demographics & Basic Health',
      questions: [
        {
          id: 'age',
          title: 'What is your age?',
          type: 'number' as const,
          placeholder: 'Enter your age',
          required: true,
          defaultValue: 40,
        },
        {
          id: 'biologicalSex',
          title: 'What is your biological sex?',
          type: 'radio' as const,
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ],
          required: true,
          defaultValue: 'other',
        },
        {
          id: 'raceEthnicity',
          title: 'What is your race/ethnicity?',
          subtitle: 'This helps assess genetic predisposition patterns',
          type: 'radio' as const,
          options: [
            { value: 'white', label: 'White/Caucasian' },
            { value: 'black', label: 'Black/African American' },
            { value: 'hispanic', label: 'Hispanic/Latino' },
            { value: 'asian', label: 'Asian' },
            { value: 'native_american', label: 'Native American' },
            { value: 'pacific_islander', label: 'Pacific Islander' },
            { value: 'other', label: 'Other/Mixed' },
          ],
          required: true,
          defaultValue: 'other',
        },
        {
          id: 'height',
          title: 'What is your height?',
          type: 'number' as const,
          placeholder: 'Height in centimeters (e.g., 170)',
          required: true,
          defaultValue: 170,
        },
        {
          id: 'weight',
          title: 'What is your weight?',
          type: 'number' as const,
          placeholder: 'Weight in kilograms (e.g., 70)',
          required: true,
          defaultValue: 70,
        },
        {
          id: 'countryOfBirth',
          title: 'What is your country of birth?',
          subtitle: 'Environmental exposures vary by geographic region',
          type: 'text' as const,
          placeholder: 'Enter country of birth',
          defaultValue: '',
        },
        {
          id: 'currentLocation',
          title: 'Where do you currently live?',
          subtitle: 'Current environmental factors and healthcare access',
          type: 'text' as const,
          placeholder: 'City, State/Province, Country',
          defaultValue: '',
        },
      ],
    },
    {
      title: 'Family History & Genetics',
      questions: [
        {
          id: 'familyHistoryParents',
          title: 'Have any of your parents been diagnosed with cancer?',
          type: 'checkbox' as const,
          options: [
            { value: 'breast', label: 'Breast cancer' },
            { value: 'lung', label: 'Lung cancer' },
            { value: 'colorectal', label: 'Colorectal cancer' },
            { value: 'prostate', label: 'Prostate cancer' },
            { value: 'ovarian', label: 'Ovarian cancer' },
            { value: 'pancreatic', label: 'Pancreatic cancer' },
            { value: 'skin', label: 'Skin cancer/Melanoma' },
            { value: 'liver', label: 'Liver cancer' },
            { value: 'kidney', label: 'Kidney cancer' },
            { value: 'bladder', label: 'Bladder cancer' },
            { value: 'other', label: 'Other cancer types' },
            { value: 'none', label: 'No parental cancer history' },
          ],
          defaultValue: {
            breast: false, lung: false, colorectal: false, prostate: false, ovarian: false, pancreatic: false, skin: false, liver: false, kidney: false, bladder: false, other: false, none: false
          },
        },
        {
          id: 'familyHistorySiblings',
          title: 'Have any of your siblings been diagnosed with cancer?',
          type: 'checkbox' as const,
          options: [
            { value: 'breast', label: 'Breast cancer' },
            { value: 'lung', label: 'Lung cancer' },
            { value: 'colorectal', label: 'Colorectal cancer' },
            { value: 'prostate', label: 'Prostate cancer' },
            { value: 'ovarian', label: 'Ovarian cancer' },
            { value: 'pancreatic', label: 'Pancreatic cancer' },
            { value: 'skin', label: 'Skin cancer/Melanoma' },
            { value: 'liver', label: 'Liver cancer' },
            { value: 'kidney', label: 'Kidney cancer' },
            { value: 'bladder', label: 'Bladder cancer' },
            { value: 'other', label: 'Other cancer types' },
            { value: 'none', label: 'No sibling cancer history' },
          ],
          defaultValue: {
            breast: false, lung: false, colorectal: false, prostate: false, ovarian: false, pancreatic: false, skin: false, liver: false, kidney: false, bladder: false, other: false, none: false
          },
        },
        {
          id: 'earlyOnsetCancers',
          title: 'Has anyone in your family been diagnosed with cancer before age 50?',
          subtitle: 'Early-onset cancers may indicate hereditary cancer syndromes',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'unknown', label: 'Unknown' },
          ],
          defaultValue: 'unknown',
        },
        {
          id: 'multipleRelativesSameCancer',
          title: 'Do multiple relatives have the same type of cancer?',
          subtitle: 'Multiple cases of the same cancer may suggest genetic predisposition',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'unknown', label: 'Unknown' },
          ],
          defaultValue: 'unknown',
        },
        {
          id: 'ashkenaziJewish',
          title: 'Are you of Ashkenazi Jewish descent?',
          subtitle: 'Higher prevalence of BRCA mutations in this population',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'unknown', label: 'Unknown' },
          ],
          defaultValue: 'unknown',
        },
        {
          id: 'geneticTesting',
          title: 'Have you had genetic testing for cancer predisposition?',
          type: 'radio' as const,
          options: [
            { value: 'positive_brca', label: 'Yes, positive for BRCA mutations' },
            { value: 'positive_lynch', label: 'Yes, positive for Lynch syndrome' },
            { value: 'positive_other', label: 'Yes, positive for other mutations' },
            { value: 'negative', label: 'Yes, negative for mutations' },
            { value: 'no', label: 'No, never tested' },
            { value: 'interested', label: 'No, but interested in testing' },
          ],
          defaultValue: 'unknown',
        },
      ],
    },
    {
      title: 'Personal Medical History',
      questions: [
        {
          id: 'previousCancer',
          title: 'Have you ever been diagnosed with cancer?',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
          required: true,
          defaultValue: 'no',
        },
        {
          id: 'previousCancerDetails',
          title: 'What type of cancer were you diagnosed with?',
          type: 'text' as const,
          placeholder: 'Enter cancer type and year of diagnosis',
          condition: (data: UserData) => typeof data.previousCancer === 'string' ? data.previousCancer === 'yes' : data.previousCancer?.diagnosed === true,
          defaultValue: '',
        },
        {
          id: 'benignConditions',
          title: 'Have you been diagnosed with any of these benign conditions?',
          subtitle: 'These conditions may increase cancer risk',
          type: 'checkbox' as const,
          options: [
            { value: 'polyps', label: 'Colon polyps' },
            { value: 'atypical_hyperplasia', label: 'Atypical hyperplasia (breast)' },
            { value: 'lcis', label: 'LCIS (Lobular carcinoma in situ)' },
            { value: 'barrett_esophagus', label: "Barrett's esophagus" },
            { value: 'dysplastic_nevi', label: 'Dysplastic nevi (atypical moles)' },
            { value: 'none', label: 'None of the above' },
          ],
          defaultValue: {
            polyps: false, atypical_hyperplasia: false, lcis: false, barrett_esophagus: false, dysplastic_nevi: false, none: false
          },
        },
        {
          id: 'chronicConditions',
          title: 'Do you have any of these chronic conditions?',
          subtitle: 'Select all that apply',
          type: 'checkbox' as const,
          options: [
            { value: 'diabetes', label: 'Diabetes' },
            { value: 'ibd', label: 'Inflammatory Bowel Disease (IBD)' },
            { value: 'hepatitisB', label: 'Hepatitis B' },
            { value: 'hepatitisC', label: 'Hepatitis C' },
            { value: 'hiv', label: 'HIV' },
            { value: 'autoimmune', label: 'Autoimmune conditions' },
            { value: 'pcos', label: 'PCOS (Polycystic Ovary Syndrome)' },
            { value: 'endometriosis', label: 'Endometriosis' },
            { value: 'none', label: 'None of the above' },
          ],
          defaultValue: {
            diabetes: false, ibd: false, hepatitisB: false, hepatitisC: false, hiv: false, autoimmune: false, pcos: false, endometriosis: false, none: false
          },
        },
        {
          id: 'radiationExposure',
          title: 'Have you ever received radiation therapy or been exposed to significant radiation?',
          subtitle: 'Including medical treatments, occupational exposure, or nuclear accidents',
          type: 'radio' as const,
          options: [
            { value: 'yes_medical', label: 'Yes, medical radiation therapy' },
            { value: 'yes_occupational', label: 'Yes, occupational exposure' },
            { value: 'yes_other', label: 'Yes, other significant exposure' },
            { value: 'no', label: 'No' },
            { value: 'unknown', label: 'Unknown' },
          ],
          defaultValue: 'unknown',
        },
        {
          id: 'immunosuppression',
          title: 'Have you ever taken immunosuppressive medications?',
          subtitle: 'Including organ transplant medications or long-term steroids',
          type: 'radio' as const,
          options: [
            { value: 'yes_transplant', label: 'Yes, for organ transplant' },
            { value: 'yes_autoimmune', label: 'Yes, for autoimmune condition' },
            { value: 'yes_other', label: 'Yes, for other reasons' },
            { value: 'no', label: 'No' },
          ],
          defaultValue: 'unknown',
        },
      ],
    },
    {
      title: 'Reproductive Health (Women)',
      questions: [
        {
          id: 'ageAtMenarche',
          title: 'At what age did you have your first menstrual period?',
          subtitle: 'Early menarche (before 12) increases breast cancer risk',
          type: 'number' as const,
          placeholder: 'Age in years',
          condition: (data: UserData) => data.biologicalSex === 'female',
          defaultValue: 12,
        },
        {
          id: 'pregnancies',
          title: 'How many pregnancies have you had that lasted 6+ months?',
          subtitle: 'Full-term pregnancies reduce breast and ovarian cancer risk',
          type: 'number' as const,
          placeholder: 'Number of pregnancies (0 if none)',
          condition: (data: UserData) => data.biologicalSex === 'female',
          defaultValue: 0,
        },
        {
          id: 'ageAtFirstBirth',
          title: 'At what age did you have your first child?',
          subtitle: 'Later age at first birth increases breast cancer risk',
          type: 'number' as const,
          placeholder: 'Age at first birth',
          condition: (data: UserData) => data.biologicalSex === 'female' && (data.pregnancies || 0) > 0,
          defaultValue: 25,
        },
        {
          id: 'breastfeedingMonths',
          title: 'How many total months did you breastfeed?',
          subtitle: 'Breastfeeding reduces breast and ovarian cancer risk',
          type: 'number' as const,
          placeholder: 'Total months across all children',
          condition: (data: UserData) => data.biologicalSex === 'female' && (data.pregnancies || 0) > 0,
          defaultValue: 0,
        },
        {
          id: 'birthControlUse',
          title: 'Have you used birth control pills?',
          subtitle: 'Long-term use may slightly increase breast cancer risk',
          type: 'radio' as const,
          options: [
            { value: 'never', label: 'Never used' },
            { value: 'short', label: 'Less than 5 years' },
            { value: 'medium', label: '5-10 years' },
            { value: 'long', label: 'More than 10 years' },
            { value: 'current', label: 'Currently using' },
          ],
          condition: (data: UserData) => data.biologicalSex === 'female',
          defaultValue: 'never',
        },
        {
          id: 'menopauseStatus',
          title: 'What is your menopause status?',
          type: 'radio' as const,
          options: [
            { value: 'premenopausal', label: 'Still having regular periods' },
            { value: 'perimenopausal', label: 'Irregular periods' },
            { value: 'postmenopausal', label: 'No periods for 12+ months' },
            { value: 'surgical', label: 'Surgical menopause (hysterectomy)' },
          ],
          condition: (data: UserData) => data.biologicalSex === 'female' && (data.age || 0) > 35,
          defaultValue: 'premenopausal',
        },
        {
          id: 'ageAtMenopause',
          title: 'At what age did you reach menopause?',
          subtitle: 'Later menopause increases breast cancer risk',
          type: 'number' as const,
          placeholder: 'Age at menopause',
          condition: (data: UserData) => data.biologicalSex === 'female' && (data.menopauseStatus === 'postmenopausal' || data.menopauseStatus === 'surgical'),
          defaultValue: 50,
        },
        {
          id: 'hrtUse',
          title: 'Have you used hormone replacement therapy (HRT)?',
          subtitle: 'HRT use affects breast and other cancer risks',
          type: 'radio' as const,
          options: [
            { value: 'never', label: 'Never used' },
            { value: 'current', label: 'Currently using' },
            { value: 'former_short', label: 'Used for less than 5 years' },
            { value: 'former_long', label: 'Used for 5+ years' },
          ],
          condition: (data: UserData) => data.biologicalSex === 'female',
          defaultValue: 'never',
        },
        {
          id: 'breastDensity',
          title: 'What is your breast density (if known from mammograms)?',
          subtitle: 'Dense breast tissue increases breast cancer risk',
          type: 'radio' as const,
          options: [
            { value: 'almost_entirely_fatty', label: 'Almost entirely fatty' },
            { value: 'scattered_fibroglandular', label: 'Scattered fibroglandular densities' },
            { value: 'heterogeneously_dense', label: 'Heterogeneously dense' },
            { value: 'extremely_dense', label: 'Extremely dense' },
            { value: 'unknown', label: 'Unknown' },
          ],
          condition: (data: UserData) => data.biologicalSex === 'female',
          defaultValue: 'unknown',
        },
      ],
    },
    {
      title: 'Lifestyle Factors - Tobacco & Alcohol',
      questions: [
        {
          id: 'smokingStatus',
          title: 'What is your smoking status?',
          type: 'radio' as const,
          options: [
            { value: 'never', label: 'Never smoked' },
            { value: 'former', label: 'Former smoker' },
            { value: 'current', label: 'Current smoker' },
          ],
          required: true,
          defaultValue: 'never',
        },
        {
          id: 'smokingPackYears',
          title: 'How many pack-years have you smoked?',
          subtitle: 'Pack-years = (cigarettes per day ÷ 20) × years smoked',
          type: 'number' as const,
          placeholder: 'Enter pack-years',
          condition: (data: UserData) => data.smokingStatus !== 'never',
          defaultValue: 0,
        },
        {
          id: 'ageStartedSmoking',
          title: 'At what age did you start smoking?',
          type: 'number' as const,
          placeholder: 'Age when started',
          condition: (data: UserData) => data.smokingStatus !== 'never',
          defaultValue: 14,
        },
        {
          id: 'ageQuitSmoking',
          title: 'At what age did you quit smoking?',
          type: 'number' as const,
          placeholder: 'Age when quit',
          condition: (data: UserData) => data.smokingStatus === 'former',
          defaultValue: 25,
        },
        {
          id: 'secondhandSmoke',
          title: 'Are you regularly exposed to secondhand smoke?',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes, regularly' },
            { value: 'occasionally', label: 'Occasionally' },
            { value: 'no', label: 'No' },
          ],
          defaultValue: 'no',
        },
        {
          id: 'otherTobacco',
          title: 'Do you use other tobacco products?',
          subtitle: 'Select all that apply',
          type: 'checkbox' as const,
          options: [
            { value: 'cigars', label: 'Cigars' },
            { value: 'pipes', label: 'Pipes' },
            { value: 'chewing_tobacco', label: 'Chewing tobacco' },
            { value: 'snuff', label: 'Snuff' },
            { value: 'ecigarettes', label: 'E-cigarettes/vaping' },
            { value: 'none', label: 'None' },
          ],
          defaultValue: {
            cigars: false, pipes: false, chewing_tobacco: false, snuff: false, ecigarettes: false, none: false
          },
        },
        {
          id: 'alcoholConsumption',
          title: 'How would you describe your alcohol consumption?',
          type: 'radio' as const,
          options: [
            { value: 'never', label: 'Never drink alcohol' },
            { value: 'light', label: 'Light (1-3 drinks per week)' },
            { value: 'moderate', label: 'Moderate (4-14 drinks per week)' },
            { value: 'heavy', label: 'Heavy (15+ drinks per week)' },
          ],
          required: true,
          defaultValue: 'never',
        },
        {
          id: 'bingeFrequency',
          title: 'How often do you have 4+ drinks in a single occasion?',
          type: 'radio' as const,
          options: [
            { value: 'never', label: 'Never' },
            { value: 'monthly', label: 'Monthly or less' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'daily', label: 'Daily or almost daily' },
          ],
          condition: (data: UserData) => {
            if (typeof data.alcoholConsumption === 'string') {
              return data.alcoholConsumption !== 'never';
            } else if (typeof data.alcoholConsumption === 'object' && data.alcoholConsumption !== null) {
              return data.alcoholConsumption.currentStatus !== 'never';
            }
            return false;
          },
          defaultValue: 'never',
        },
        {
          id: 'alcoholYears',
          title: 'For how many years have you been drinking alcohol regularly?',
          type: 'number' as const,
          placeholder: 'Number of years',
          condition: (data: UserData) => {
            if (typeof data.alcoholConsumption === 'string') {
              return data.alcoholConsumption !== 'never';
            } else if (typeof data.alcoholConsumption === 'object' && data.alcoholConsumption !== null) {
              return data.alcoholConsumption.currentStatus !== 'never';
            }
            return false;
          },
          defaultValue: 0,
        },
      ],
    },
    {
      title: 'Lifestyle Factors - Diet & Exercise',
      questions: [
        {
          id: 'fruitsVegetables',
          title: 'How many servings of fruits and vegetables do you eat per day?',
          subtitle: 'One serving = 1 cup raw or ½ cup cooked',
          type: 'radio' as const,
          options: [
            { value: '0-1', label: '0-1 servings' },
            { value: '2-3', label: '2-3 servings' },
            { value: '4-5', label: '4-5 servings' },
            { value: '6+', label: '6+ servings' },
          ],
          required: true,
          defaultValue: '2-3',
        },
        {
          id: 'redMeatConsumption',
          title: 'How often do you eat red meat?',
          subtitle: 'Red meat includes beef, pork, lamb',
          type: 'radio' as const,
          options: [
            { value: 'never', label: 'Never' },
            { value: 'rarely', label: 'Rarely (less than once per week)' },
            { value: 'weekly', label: 'Weekly (1-3 times per week)' },
            { value: 'daily', label: 'Daily or almost daily' },
          ],
          required: true,
          defaultValue: 'never',
        },
        {
          id: 'processedMeat',
          title: 'How often do you eat processed meats (bacon, sausage, deli meats)?',
          type: 'radio' as const,
          options: [
            { value: 'never', label: 'Never' },
            { value: 'rarely', label: 'Rarely (less than once per week)' },
            { value: 'weekly', label: 'Weekly (1-3 times per week)' },
            { value: 'daily', label: 'Daily or almost daily' },
          ],
          required: true,
          defaultValue: 'never',
        },
        {
          id: 'fiberIntake',
          title: 'How would you rate your fiber intake?',
          subtitle: 'Whole grains, beans, fruits, vegetables',
          type: 'radio' as const,
          options: [
            { value: 'low', label: 'Low (mostly refined foods)' },
            { value: 'moderate', label: 'Moderate (some whole grains)' },
            { value: 'high', label: 'High (mostly whole foods)' },
          ],
          defaultValue: 'moderate',
        },
        {
          id: 'physicalActivity',
          title: 'How many minutes of moderate to vigorous exercise do you get per week?',
          type: 'radio' as const,
          options: [
            { value: 'none', label: 'None (0 minutes)' },
            { value: 'low', label: 'Low (1-75 minutes)' },
            { value: 'moderate', label: 'Moderate (75-150 minutes)' },
            { value: 'high', label: 'High (150+ minutes)' },
          ],
          required: true,
          defaultValue: 'moderate',
        },
        {
          id: 'sedentaryTime',
          title: 'How many hours per day do you spend sitting?',
          subtitle: 'Include work, commuting, and leisure time',
          type: 'radio' as const,
          options: [
            { value: 'low', label: 'Less than 4 hours' },
            { value: 'moderate', label: '4-8 hours' },
            { value: 'high', label: 'More than 8 hours' },
          ],
          required: true,
          defaultValue: 'moderate',
        },
        {
          id: 'dietType',
          title: 'Which best describes your overall diet pattern?',
          type: 'radio' as const,
          options: [
            { value: 'western', label: 'Western (high processed foods, red meat)' },
            { value: 'mediterranean', label: 'Mediterranean (fish, olive oil, vegetables)' },
            { value: 'vegetarian', label: 'Vegetarian' },
            { value: 'vegan', label: 'Vegan' },
            { value: 'other', label: 'Other' },
          ],
          defaultValue: 'western',
        },
        {
          id: 'supplements',
          title: 'Do you take any of these supplements regularly?',
          subtitle: 'Select all that apply',
          type: 'checkbox' as const,
          options: [
            { value: 'vitamin_d', label: 'Vitamin D' },
            { value: 'calcium', label: 'Calcium' },
            { value: 'multivitamin', label: 'Multivitamin' },
            { value: 'omega3', label: 'Omega-3/Fish oil' },
            { value: 'antioxidants', label: 'Antioxidant supplements' },
            { value: 'none', label: 'None' },
          ],
          defaultValue: {
            vitamin_d: false, calcium: false, multivitamin: false, omega3: false, antioxidants: false, none: false
          },
        },
      ],
    },
    {
      title: 'Environmental & Occupational Exposures',
      questions: [
        {
          id: 'occupationalExposures',
          title: 'Have you been exposed to any of these at work?',
          subtitle: 'Select all that apply',
          type: 'checkbox' as const,
          options: [
            { value: 'asbestos', label: 'Asbestos' },
            { value: 'chemicals', label: 'Industrial chemicals or solvents' },
            { value: 'radiation', label: 'Ionizing radiation' },
            { value: 'pesticides', label: 'Pesticides or herbicides' },
            { value: 'metals', label: 'Heavy metals (lead, cadmium, etc.)' },
            { value: 'dust', label: 'Industrial dust or particles' },
            { value: 'diesel', label: 'Diesel exhaust' },
            { value: 'none', label: 'None of the above' },
          ],
          defaultValue: {
            asbestos: false, chemicals: false, radiation: false, pesticides: false, metals: false, dust: false, diesel: false, none: false
          },
        },
        {
          id: 'asbestosYears',
          title: 'For how many years were you exposed to asbestos?',
          type: 'number' as const,
          placeholder: 'Number of years',
          condition: (data: UserData) => !!data.occupationalExposures?.asbestos,
          defaultValue: 0,
        },
        {
          id: 'shiftWork',
          title: 'Do you work night shifts or rotating shifts?',
          subtitle: 'Disrupted circadian rhythms may increase cancer risk',
          type: 'radio' as const,
          options: [
            { value: 'never', label: 'Never' },
            { value: 'occasionally', label: 'Occasionally' },
            { value: 'regularly', label: 'Regularly (most of career)' },
          ],
          defaultValue: 'never',
        },
        {
          id: 'airPollution',
          title: 'How would you rate the air quality where you live?',
          type: 'radio' as const,
          options: [
            { value: 'good', label: 'Good (rural/clean air)' },
            { value: 'moderate', label: 'Moderate (suburban)' },
            { value: 'poor', label: 'Poor (urban/industrial area)' },
          ],
          required: true,
          defaultValue: 'good',
        },
        {
          id: 'radonExposure',
          title: 'Has your home been tested for radon?',
          subtitle: 'Radon is the second leading cause of lung cancer',
          type: 'radio' as const,
          options: [
            { value: 'low', label: 'Yes, levels were low' },
            { value: 'high', label: 'Yes, levels were elevated' },
            { value: 'never', label: 'Never tested' },
          ],
          defaultValue: 'never',
        },
        {
          id: 'waterQuality',
          title: 'How would you rate your drinking water quality?',
          type: 'radio' as const,
          options: [
            { value: 'excellent', label: 'Excellent (filtered/bottled)' },
            { value: 'good', label: 'Good (municipal water)' },
            { value: 'fair', label: 'Fair (some concerns)' },
            { value: 'poor', label: 'Poor (known contamination)' },
          ],
          defaultValue: 'good',
        },
        {
          id: 'pesticideExposure',
          title: 'Have you been regularly exposed to pesticides?',
          subtitle: 'Agricultural work, lawn care, or home use',
          type: 'radio' as const,
          options: [
            { value: 'occupational', label: 'Yes, occupational exposure' },
            { value: 'home', label: 'Yes, regular home use' },
            { value: 'minimal', label: 'Minimal exposure' },
            { value: 'none', label: 'No exposure' },
          ],
          defaultValue: 'none',
        },
      ],
    },
    {
      title: 'Sun Exposure & Skin Health',
      questions: [
        {
          id: 'skinType',
          title: 'What is your skin type?',
          subtitle: 'How does your skin typically react to sun exposure?',
          type: 'radio' as const,
          options: [
            { value: '1', label: 'Type I: Always burns, never tans (very fair)' },
            { value: '2', label: 'Type II: Usually burns, tans minimally (fair)' },
            { value: '3', label: 'Type III: Sometimes burns, tans gradually (medium)' },
            { value: '4', label: 'Type IV: Rarely burns, tans easily (olive)' },
            { value: '5', label: 'Type V: Very rarely burns, tans very easily (brown)' },
            { value: '6', label: 'Type VI: Never burns, deeply pigmented (black)' },
          ],
          required: true,
          defaultValue: '3',
        },
        {
          id: 'sunExposure',
          title: 'How much sun exposure do you typically get?',
          type: 'radio' as const,
          options: [
            { value: 'minimal', label: 'Minimal (mostly indoors)' },
            { value: 'moderate', label: 'Moderate (some outdoor activities)' },
            { value: 'high', label: 'High (outdoor job or frequent sun exposure)' },
          ],
          required: true,
          defaultValue: 'moderate',
        },
        {
          id: 'severeSunburns',
          title: 'How many severe sunburns have you had in your lifetime?',
          subtitle: 'Severe = blistering, peeling, or requiring medical attention',
          type: 'radio' as const,
          options: [
            { value: '0', label: 'None' },
            { value: '1-2', label: '1-2 sunburns' },
            { value: '3-5', label: '3-5 sunburns' },
            { value: '6+', label: '6 or more sunburns' },
          ],
          required: true,
          defaultValue: '0',
        },
        {
          id: 'tanningBedUse',
          title: 'Have you ever used tanning beds?',
          type: 'radio' as const,
          options: [
            { value: 'never', label: 'Never used' },
            { value: 'occasional', label: 'Occasional use (less than 1 year total)' },
            { value: 'regular', label: 'Regular use (1+ years)' },
          ],
          required: true,
          defaultValue: 'never',
        },
        {
          id: 'tanningBedYears',
          title: 'For how many years did you use tanning beds?',
          type: 'number' as const,
          placeholder: 'Number of years',
          condition: (data: UserData) => data.tanningBedUse !== 'never',
          defaultValue: 0,
        },
        {
          id: 'sunProtection',
          title: 'How often do you use sun protection (sunscreen, protective clothing)?',
          type: 'radio' as const,
          options: [
            { value: 'never', label: 'Never or rarely' },
            { value: 'sometimes', label: 'Sometimes' },
            { value: 'usually', label: 'Usually' },
            { value: 'always', label: 'Always' },
          ],
          required: true,
          defaultValue: 'never',
        },
        {
          id: 'moleChanges',
          title: 'Have you noticed any changes in moles or new skin growths?',
          type: 'radio' as const,
          options: [
            { value: 'yes_concerning', label: 'Yes, concerning changes' },
            { value: 'yes_minor', label: 'Yes, minor changes' },
            { value: 'no', label: 'No changes noticed' },
            { value: 'dont_check', label: "I don't regularly check" },
          ],
          defaultValue: 'dont_check',
        },
      ],
    },
    {
      title: 'Screening History & Healthcare',
      questions: [
        {
          id: 'mammogramHistory',
          title: 'What is your mammogram screening history?',
          type: 'radio' as const,
          options: [
            { value: 'never', label: 'Never had a mammogram' },
            { value: 'irregular', label: 'Irregular screening' },
            { value: 'regular', label: 'Regular screening as recommended' },
            { value: 'enhanced', label: 'Enhanced screening (high risk)' },
          ],
          condition: (data: UserData) => data.biologicalSex === 'female' && (data.age || 0) >= 35,
          defaultValue: 'never',
        },
        {
          id: 'papSmearHistory',
          title: 'What is your Pap smear screening history?',
          type: 'radio' as const,
          options: [
            { value: 'never', label: 'Never had a Pap smear' },
            { value: 'irregular', label: 'Irregular screening' },
            { value: 'regular', label: 'Regular screening as recommended' },
            { value: 'abnormal', label: 'History of abnormal results' },
          ],
          condition: (data: UserData) => data.biologicalSex === 'female' && (data.age || 0) >= 21,
          defaultValue: 'never',
        },
        {
          id: 'colonoscopyHistory',
          title: 'What is your colonoscopy screening history?',
          type: 'radio' as const,
          options: [
            { value: 'never', label: 'Never had a colonoscopy' },
            { value: 'irregular', label: 'Irregular screening' },
            { value: 'regular', label: 'Regular screening as recommended' },
            { value: 'polyps', label: 'History of polyps found' },
          ],
          condition: (data: UserData) => (data.age || 0) >= 45,
          defaultValue: 'never',
        },
        {
          id: 'prostateScreening',
          title: 'What is your prostate screening history?',
          type: 'radio' as const,
          options: [
            { value: 'never', label: 'Never had PSA testing' },
            { value: 'irregular', label: 'Irregular screening' },
            { value: 'regular', label: 'Regular screening' },
            { value: 'elevated', label: 'History of elevated PSA' },
          ],
          condition: (data: UserData) => data.biologicalSex === 'male' && (data.age || 0) >= 45,
          defaultValue: 'never',
        },
        {
          id: 'skinCancerScreening',
          title: 'How often do you have professional skin cancer screenings?',
          type: 'radio' as const,
          options: [
            { value: 'never', label: 'Never' },
            { value: 'irregular', label: 'Irregular (as needed)' },
            { value: 'annual', label: 'Annual screening' },
            { value: 'frequent', label: 'More than once per year' },
          ],
          defaultValue: 'never',
        },
        {
          id: 'lungScreening',
          title: 'Have you had lung cancer screening (low-dose CT)?',
          type: 'radio' as const,
          options: [
            { value: 'never', label: 'Never' },
            { value: 'once', label: 'Once' },
            { value: 'regular', label: 'Regular screening' },
            { value: 'not_eligible', label: 'Not eligible/recommended' },
          ],
          condition: (data: UserData) => data.smokingStatus !== 'never' && (data.age || 0) >= 50,
          defaultValue: 'never',
        },
        {
          id: 'healthcareAccess',
          title: 'How would you rate your access to healthcare?',
          type: 'radio' as const,
          options: [
            { value: 'poor', label: 'Poor (limited access, no insurance)' },
            { value: 'fair', label: 'Fair (some barriers to care)' },
            { value: 'good', label: 'Good (regular access, insured)' },
            { value: 'excellent', label: 'Excellent (comprehensive coverage)' },
          ],
          required: true,
          defaultValue: 'good',
        },
        {
          id: 'primaryCareProvider',
          title: 'Do you have a regular primary care provider?',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes, see regularly' },
            { value: 'yes_infrequent', label: 'Yes, but see infrequently' },
            { value: 'no', label: 'No regular provider' },
          ],
          defaultValue: 'yes',
        },
      ],
    },
    {
      title: 'Psychosocial & Lifestyle Factors',
      questions: [
        {
          id: 'stressLevel',
          title: 'How would you rate your overall stress level?',
          subtitle: 'Chronic stress may affect immune function and cancer risk',
          type: 'radio' as const,
          options: [
            { value: 'low', label: 'Low stress' },
            { value: 'moderate', label: 'Moderate stress' },
            { value: 'high', label: 'High stress' },
            { value: 'very_high', label: 'Very high stress' },
          ],
          defaultValue: 'moderate',
        },
        {
          id: 'sleepQuality',
          title: 'How would you rate your sleep quality?',
          subtitle: 'Poor sleep may affect immune function',
          type: 'radio' as const,
          options: [
            { value: 'excellent', label: 'Excellent (7-9 hours, restful)' },
            { value: 'good', label: 'Good (adequate sleep most nights)' },
            { value: 'fair', label: 'Fair (some sleep issues)' },
            { value: 'poor', label: 'Poor (chronic sleep problems)' },
          ],
          defaultValue: 'good',
        },
        {
          id: 'socialSupport',
          title: 'How would you rate your social support system?',
          subtitle: 'Strong social connections may have protective health effects',
          type: 'radio' as const,
          options: [
            { value: 'excellent', label: 'Excellent (strong family/friend network)' },
            { value: 'good', label: 'Good (adequate support)' },
            { value: 'fair', label: 'Fair (limited support)' },
            { value: 'poor', label: 'Poor (isolated)' },
          ],
          defaultValue: 'good',
        },
        {
          id: 'mentalHealthHistory',
          title: 'Have you been diagnosed with any mental health conditions?',
          subtitle: 'Select all that apply',
          type: 'checkbox' as const,
          options: [
            { value: 'depression', label: 'Depression' },
            { value: 'anxiety', label: 'Anxiety disorders' },
            { value: 'ptsd', label: 'PTSD' },
            { value: 'other', label: 'Other mental health conditions' },
            { value: 'none', label: 'None' },
          ],
          defaultValue: {
            depression: false, anxiety: false, ptsd: false, other: false, none: false
          },
        },
        {
          id: 'socioeconomicStatus',
          title: 'How would you describe your socioeconomic status?',
          subtitle: 'Socioeconomic factors can affect cancer risk and outcomes',
          type: 'radio' as const,
          options: [
            { value: 'low', label: 'Low income' },
            { value: 'lower_middle', label: 'Lower middle class' },
            { value: 'middle', label: 'Middle class' },
            { value: 'upper_middle', label: 'Upper middle class' },
            { value: 'high', label: 'High income' },
          ],
          defaultValue: 'middle',
        },
        {
          id: 'education',
          title: 'What is your highest level of education?',
          type: 'radio' as const,
          options: [
            { value: 'less_than_high_school', label: 'Less than high school' },
            { value: 'high_school', label: 'High school diploma/GED' },
            { value: 'some_college', label: 'Some college' },
            { value: 'college_degree', label: 'College degree' },
            { value: 'graduate_degree', label: 'Graduate/professional degree' },
          ],
          defaultValue: 'high_school',
        },
      ],
    },
  ];

  const getAllDefaultValues = () => {
    const defaults: Record<string, any> = {};
    sections.forEach(section => {
      section.questions.forEach(q => {
        // Only include questions that are visible for the current userData
        if (!q.condition || q.condition(userData)) {
          if (q.defaultValue !== undefined) {
            defaults[q.id] = q.defaultValue;
          } else if (q.type === 'checkbox') {
            // For checkboxes, default to all options false
            if (q.options) {
              defaults[q.id] = q.options.reduce((acc, opt) => {
                acc[opt.value] = false;
                return acc;
              }, {} as Record<string, boolean>);
            }
          } else {
            defaults[q.id] = '';
          }
        }
      });
    });
    return defaults;
  };

  const currentSectionData = sections[currentSection];
  const visibleQuestions = currentSectionData.questions.filter(q => 
    !q.condition || q.condition(userData)
  );
  const currentQuestionData = visibleQuestions[currentQuestion];

  const handleAnswer = (questionId: string, value: any) => {
    setUserData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < visibleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      setCurrentQuestion(0);
    } else {
      const defaults = getAllDefaultValues();
      const merged = { ...defaults, ...userData };
      onComplete(merged);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      const prevSection = sections[currentSection - 1];
      const prevVisibleQuestions = prevSection.questions.filter(q => 
        !q.condition || q.condition(userData)
      );
      setCurrentQuestion(prevVisibleQuestions.length - 1);
    } else {
      onBack();
    }
  };

  const totalQuestions = sections.reduce((total, section) => {
    const visibleInSection = section.questions.filter(q => 
      !q.condition || q.condition(userData)
    ).length;
    return total + visibleInSection;
  }, 0);

  const completedQuestions = sections.slice(0, currentSection).reduce((total, section) => {
    const visibleInSection = section.questions.filter(q => 
      !q.condition || q.condition(userData)
    ).length;
    return total + visibleInSection;
  }, 0) + currentQuestion;

  const progress = (completedQuestions / totalQuestions) * 100;
  const isLastQuestion = currentSection === sections.length - 1 && currentQuestion === visibleQuestions.length - 1;

  // Remove the Loading... fallback and auto-advance if currentQuestion is out of bounds
  React.useEffect(() => {
    // If the current section has no visible questions, skip to the next section
    if (visibleQuestions.length === 0) {
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
        setCurrentQuestion(0);
      } else {
        // No questions left at all, complete with defaults
        const defaults = getAllDefaultValues();
        const merged = { ...defaults, ...userData };
        onComplete(merged);
      }
    } else if (currentQuestion >= visibleQuestions.length) {
      // If currentQuestion is out of bounds, auto-advance
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
        setCurrentQuestion(0);
      } else {
        const defaults = getAllDefaultValues();
        const merged = { ...defaults, ...userData };
        onComplete(merged);
      }
    }
    // eslint-disable-next-line
  }, [currentSection, userData, currentQuestion, visibleQuestions.length]);

  // Guard: If currentQuestionData is undefined, do not render QuestionCard or try to access its properties
  if (!currentQuestionData) {
    return null;
  }

  // Remove the Loading... fallback and do not return null

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-2xl mx-auto w-full">
        <div className="mb-6">
          <h2 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Section {currentSection + 1}: {currentSectionData.title}
          </h2>
          <ProgressBar progress={progress} />
        </div>
        
        <QuestionCard
          question={currentQuestionData}
          value={userData[currentQuestionData.id as keyof UserData]}
          onChange={(value) => handleAnswer(currentQuestionData.id, value)}
          darkMode={darkMode}
        />

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            className={`flex items-center px-6 py-3 transition-colors duration-200 ${
              darkMode 
                ? 'text-gray-300 hover:text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {currentSection === 0 && currentQuestion === 0 ? 'Back to Home' : 'Previous'}
          </button>

          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Question {completedQuestions + 1} of {totalQuestions}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLastQuestion ? (
              <>
                Complete Assessment
                <CheckCircle className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;