export interface UserData {
  // Section 1: Demographics & Basic Health
  age?: number;
  biologicalSex?: 'male' | 'female' | 'other';
  raceEthnicity?: 'white' | 'black' | 'hispanic' | 'asian' | 'native_american' | 'pacific_islander' | 'other';
  height?: number; // in cm
  weight?: number; // in kg
  countryOfBirth?: string;
  currentLocation?: string;

  // Section 2: Family History & Genetics
  immediateFamily?: {
    parents?: FamilyMember[];
    siblings?: FamilyMember[];
    children?: FamilyMember[];
  };
  extendedFamily?: {
    grandparents?: FamilyMember[];
    auntsUncles?: FamilyMember[];
    multipleWithSameCancer?: boolean;
    earlyOnsetCancers?: boolean;
  };
  // geneticTesting?: {
  //   brca1?: boolean;
  //   brca2?: boolean;
  //   lynchSyndrome?: boolean;
  //   otherSyndromes?: string[];
  //   interestedInTesting?: boolean;
  // };

  // Section 3: Personal Medical History
  previousCancer?: {
    diagnosed?: boolean;
    type?: string;
    stage?: string;
    treatment?: string;
    yearsSince?: number;
  };
  benignConditions?: {
    polyps?: boolean;
    atypicalHyperplasia?: boolean;
    other?: string[];
  };
  chronicConditions?: {
    diabetes?: boolean;
    ibd?: boolean;
    hepatitisB?: boolean;
    hepatitisC?: boolean;
    hiv?: boolean;
    autoimmune?: string[];
  };
  hormonalFactors?: {
    ageAtMenarche?: number;
    ageAtMenopause?: number;
    pregnancies?: number;
    ageAtFirstBirth?: number;
    breastfeedingMonths?: number;
    hrtUse?: boolean;
    hrtDuration?: number;
    birthControlUse?: boolean;
    birthControlDuration?: number;
  };
  medicalProcedures?: {
    radiationTherapy?: boolean;
    organTransplant?: boolean;
    majorSurgeries?: string[];
  };

  // Section 4: Lifestyle Factors
  tobaccoUse?: {
    smokingStatus?: 'never' | 'former' | 'current';
    packsPerDay?: number;
    yearsSmoked?: number;
    ageStarted?: number;
    ageQuit?: number;
    secondhandExposure?: boolean;
    otherTobacco?: string[];
  };
  alcoholConsumption?: {
    currentStatus?: 'never' | 'former' | 'current';
    drinksPerWeek?: number;
    bingeFrequency?: 'never' | 'monthly' | 'weekly' | 'daily';
    yearsHeavyDrinking?: number;
  };
  diet?: {
    fruitsVegetablesPerDay?: number;
    redMeatFrequency?: 'never' | 'rarely' | 'weekly' | 'daily';
    processedMeatFrequency?: 'never' | 'rarely' | 'weekly' | 'daily';
    fiberIntake?: 'low' | 'moderate' | 'high';
    calciumSupplement?: boolean;
    vitaminDSupplement?: boolean;
    dietType?: 'western' | 'mediterranean' | 'vegetarian' | 'other';
  };
  physicalActivity?: {
    moderateMinutesPerWeek?: number;
    vigorousMinutesPerWeek?: number;
    sedentaryHoursPerDay?: number;
    historicallyActive?: boolean;
  };
  bodyWeight?: {
    currentBMI?: number;
    maxWeight?: number;
    weightAt18?: number;
    recentWeightChange?: number;
  };

  // Section 5: Environmental & Occupational Exposures
  occupationalExposures?: {
    asbestos?: boolean;
    chemicals?: string[];
    radiation?: boolean;
    shiftWork?: boolean;
  };
  environmentalFactors?: {
    airPollution?: 'low' | 'moderate' | 'high';
    radonExposure?: boolean;
    waterQuality?: 'good' | 'fair' | 'poor';
    cancerCluster?: boolean;
  };
  sunExposure?: {
    skinType?: 1 | 2 | 3 | 4 | 5 | 6; // Fitzpatrick scale
    severeSunburns?: number;
    tanningBedUse?: boolean;
    tanningBedYears?: number;
    sunProtectionUse?: 'never' | 'sometimes' | 'always';
  };

  // Section 6: Reproductive & Hormonal History
  reproductiveHealth?: {
    menarcheAge?: number;
    menopauseAge?: number;
    pregnancyDetails?: PregnancyDetail[];
    breastfeedingTotal?: number;
    contraceptiveHistory?: ContraceptiveUse[];
    hormoneTherapy?: HormoneTherapy[];
    gynecologicalIssues?: string[];
    // Men-specific
    testosteroneTherapy?: boolean;
    prostateIssues?: string[];
    testicularConditions?: string[];
  };

  // Section 7: Screening History & Healthcare Access
  screeningHistory?: {
    mammograms?: ScreeningRecord;
    papSmears?: ScreeningRecord;
    colonoscopies?: ScreeningRecord;
    prostateScreening?: ScreeningRecord;
    skinCancerChecks?: ScreeningRecord;
    chestImaging?: ScreeningRecord;
  };
  healthcareAccess?: {
    quality?: 'poor' | 'fair' | 'good' | 'excellent';
    insurance?: boolean;
    regularPrimaryCare?: boolean;
  };

  // Section 8: Psychosocial Factors
  psychosocialFactors?: {
    stressLevel?: 'low' | 'moderate' | 'high';
    mentalHealthHistory?: string[];
    socialSupport?: 'poor' | 'fair' | 'good' | 'excellent';
    socioeconomicStatus?: 'low' | 'middle' | 'high';
    healthLiteracy?: 'low' | 'moderate' | 'high';
  };

  // Section 9: Advanced Risk Factors (Premium)
  advancedRiskFactors?: {
    breastDensity?: 'almost_entirely_fatty' | 'scattered_fibroglandular' | 'heterogeneously_dense' | 'extremely_dense';
    atypicalHyperplasia?: boolean;
    lcis?: boolean; // Lobular carcinoma in situ
    previousBiopsy?: boolean;
    ashkenaziJewish?: boolean;
    dna_repair_genes?: string[]; // PALB2, CHEK2, ATM, etc.
    polygenic_risk_score?: number;
  };

  // Section 10: Detailed Environmental History
  detailedEnvironmental?: {
    occupationalChemicals?: string[];
    asbestosYears?: number;
    radiationDose?: number;
    shiftWorkYears?: number;
    airPollutionPM25?: number;
    radonLevel?: number;
    arsenicExposure?: boolean;
    pesticideExposure?: boolean;
  };

  // Section 11: Comprehensive Reproductive History
  comprehensiveReproductive?: {
    menstrualCycleLength?: number;
    irregularPeriods?: boolean;
    pcos?: boolean;
    endometriosis?: boolean;
    fibroids?: boolean;
    ovarian_cysts?: boolean;
    fertility_treatments?: boolean;
    miscarriages?: number;
    stillbirths?: number;
    breastfeeding_difficulties?: boolean;
  };

  // Section 12: Detailed Lifestyle Assessment
  detailedLifestyle?: {
    mediterranean_diet_score?: number;
    processed_food_frequency?: 'daily' | 'weekly' | 'monthly' | 'rarely';
    sugar_intake?: 'low' | 'moderate' | 'high';
    omega3_intake?: 'low' | 'moderate' | 'high';
    vitamin_d_level?: number;
    sleep_hours?: number;
    sleep_quality?: 'poor' | 'fair' | 'good' | 'excellent';
    stress_management?: 'poor' | 'fair' | 'good' | 'excellent';
    social_connections?: 'isolated' | 'some' | 'moderate' | 'strong';
  };

  // Simplified properties for backward compatibility
  familyHistoryParents?: { [key: string]: boolean };
  familyHistorySiblings?: { [key: string]: boolean };
  earlyOnsetCancers?: string;
  geneticTesting?: string;
  previousCancer?: string;
  chronicConditions?: { [key: string]: boolean };
  radiationExposure?: string;
  ageAtMenarche?: number;
  pregnancies?: number;
  ageAtFirstBirth?: number;
  breastfeedingMonths?: number;
  birthControlUse?: string;
  menopauseStatus?: string;
  hrtUse?: string;
  smokingStatus?: string;
  smokingPackYears?: number;
  ageStartedSmoking?: number;
  ageQuitSmoking?: number;
  secondhandSmoke?: string;
  alcoholConsumption?: string;
  bingeFrequency?: string;
  fruitsVegetables?: string;
  redMeatConsumption?: string;
  processedMeat?: string;
  physicalActivity?: string;
  sedentaryTime?: string;
  occupationalExposures?: { [key: string]: boolean };
  shiftWork?: string;
  airPollution?: string;
  radonExposure?: string;
  skinType?: string;
  sunExposure?: string;
  severeSunburns?: string;
  tanningBedUse?: string;
  sunProtection?: string;
  mammogramHistory?: string;
  papSmearHistory?: string;
  colonoscopyHistory?: string;
  prostateScreening?: string;
  healthcareAccess?: string;
}

// Basic questionnaire data structure (simplified)
export interface BasicUserData {
  age?: number;
  biologicalSex?: 'male' | 'female' | 'other';
  raceEthnicity?: string;
  height?: number;
  weight?: number;
  familyHistory?: { [key: string]: boolean };
  smokingStatus?: string;
  smokingPackYears?: number;
  alcoholConsumption?: string;
  physicalActivity?: string;
  fruitsVegetables?: string;
  redMeatConsumption?: string;
  sunExposure?: string;
  skinType?: string;
  ageAtMenarche?: number;
  pregnancies?: number;
  mammogramHistory?: string;
  colonoscopyHistory?: string;
  healthcareAccess?: string;
}

export interface FamilyMember {
  relationship: string;
  cancerType?: string;
  ageAtDiagnosis?: number;
  alive?: boolean;
}

export interface PregnancyDetail {
  ageAtBirth: number;
  breastfeedingMonths: number;
}

export interface ContraceptiveUse {
  type: string;
  durationMonths: number;
  ageStarted: number;
}

export interface HormoneTherapy {
  type: string;
  durationMonths: number;
  ageStarted: number;
}

export interface ScreeningRecord {
  frequency?: 'never' | 'irregular' | 'regular';
  ageStarted?: number;
  lastScreening?: number; // years ago
  abnormalResults?: boolean;
  findings?: string[];
}

export interface RiskAssessment {
  cancerType: string;
  riskLevel: 'Low' | 'Average' | 'Elevated' | 'High';
  absoluteRisk: {
    fiveYear: number;
    tenYear: number;
    lifetime: number;
  };
  relativeRisk: number; // compared to average person same age/gender
  riskCategory: string;
  modifiableFactors: RiskFactor[];
  nonModifiableFactors: RiskFactor[];
  recommendations: Recommendation[];
  screeningTimeline: ScreeningRecommendation[];
  riskReductionPotential?: number;
  riskModel?: string; // Gail, Tyrer-Cuzick, CCRAT, etc.
  confidenceInterval?: {
    lower: number;
    upper: number;
  };
}

export interface BasicRiskAssessment {
  cancerType: string;
  riskLevel: 'Low' | 'Average' | 'Elevated' | 'High';
  riskScore: number;
  keyFactors: string[];
  recommendations: BasicRecommendation[];
  riskModel?: string;
}

export interface BasicRecommendation {
  category: 'lifestyle' | 'screening' | 'medical';
  priority: 'high' | 'medium' | 'low';
  action: string;
  description: string;
  impact?: string;
}

export interface RiskFactor {
  factor: string;
  impact: 'low' | 'moderate' | 'high';
  description: string;
}

export interface Recommendation {
  category: 'lifestyle' | 'screening' | 'medical' | 'genetic';
  priority: 'low' | 'medium' | 'high';
  action: string;
  description: string;
  potentialImpact?: string;
}

export interface ScreeningRecommendation {
  test: string;
  startAge: number;
  frequency: string;
  priority: 'routine' | 'enhanced' | 'high-risk';
}