import { BasicUserData, BasicRiskAssessment, BasicRecommendation } from '../types/UserData';

export function calculateBasicRisks(userData: BasicUserData): BasicRiskAssessment[] {
  const assessments: BasicRiskAssessment[] = [];

  // Calculate risks for major cancer types
  assessments.push(calculateBasicLungCancerRisk(userData));
  assessments.push(calculateBasicColorectalCancerRisk(userData));
  assessments.push(calculateBasicSkinCancerRisk(userData));

  // Gender-specific cancers
  if (userData.biologicalSex === 'female') {
    assessments.push(calculateBasicBreastCancerRisk(userData));
    assessments.push(calculateBasicOvarianCancerRisk(userData));
  }

  if (userData.biologicalSex === 'male') {
    assessments.push(calculateBasicProstateCancerRisk(userData));
  }

  // Additional cancer types
  assessments.push(calculateBasicPancreaticCancerRisk(userData));

  return assessments;
}

function calculateBasicLungCancerRisk(userData: BasicUserData): BasicRiskAssessment {
  let riskScore = 2; // Base score out of 10
  const keyFactors: string[] = [];
  const recommendations: BasicRecommendation[] = [];

  // Age factor
  if (userData.age && userData.age > 65) {
    riskScore += 2;
    keyFactors.push('Age over 65 (major risk factor)');
  } else if (userData.age && userData.age > 50) {
    riskScore += 1;
    keyFactors.push('Age over 50');
  }

  // Smoking - most critical factor (using pack-years if available)
  if (userData.smokingStatus === 'current') {
    const packYears = userData.smokingPackYears || 0;
    if (packYears > 30) {
      riskScore += 5;
      keyFactors.push(`Current heavy smoking (${packYears} pack-years)`);
    } else if (packYears > 10) {
      riskScore += 4;
      keyFactors.push(`Current moderate smoking (${packYears} pack-years)`);
    } else {
      riskScore += 3;
      keyFactors.push('Current smoking');
    }
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Quit smoking immediately',
      description: 'Smoking cessation is the most important step to reduce lung cancer risk',
      impact: 'Can reduce risk by 50% within 5 years'
    });
  } else if (userData.smokingStatus === 'former') {
    const packYears = userData.smokingPackYears || 0;
    if (packYears > 30) {
      riskScore += 3;
      keyFactors.push(`Former heavy smoking history (${packYears} pack-years)`);
    } else if (packYears > 10) {
      riskScore += 2;
      keyFactors.push(`Former moderate smoking history (${packYears} pack-years)`);
    } else {
      riskScore += 1;
      keyFactors.push('Former smoking history');
    }
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Continue avoiding tobacco',
      description: 'Maintain your smoke-free lifestyle'
    });
  } else {
    recommendations.push({
      category: 'lifestyle',
      priority: 'low',
      action: 'Never start smoking',
      description: 'Continue avoiding tobacco products'
    });
  }

  // Family history
  if (userData.familyHistory?.lung) {
    riskScore += 1;
    keyFactors.push('Family history of lung cancer');
    recommendations.push({
      category: 'screening',
      priority: 'medium',
      action: 'Discuss early screening',
      description: 'Talk to your doctor about lung cancer screening options'
    });
  }

  // Physical activity (protective)
  if (userData.physicalActivity === 'none' || userData.physicalActivity === 'low') {
    riskScore += 1;
    keyFactors.push('Low physical activity');
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Increase physical activity',
      description: 'Aim for 150 minutes of moderate exercise per week'
    });
  }

  // General recommendations
  recommendations.push({
    category: 'lifestyle',
    priority: 'medium',
    action: 'Eat antioxidant-rich foods',
    description: 'Include fruits and vegetables high in antioxidants'
  });

  const riskLevel = riskScore >= 8 ? 'High' : riskScore >= 6 ? 'Elevated' : riskScore >= 4 ? 'Average' : 'Low';

  return {
    cancerType: 'Lung Cancer',
    riskLevel,
    riskScore: Math.min(riskScore, 10),
    keyFactors,
    recommendations,
    riskModel: 'Modified PLCO Model'
  };
}

function calculateBasicBreastCancerRisk(userData: BasicUserData): BasicRiskAssessment {
  let riskScore = 3; // Base score for women
  const keyFactors: string[] = [];
  const recommendations: BasicRecommendation[] = [];

  // Age factor (Gail Model component)
  if (userData.age && userData.age > 65) {
    riskScore += 2;
    keyFactors.push('Age over 65 (major risk factor)');
  } else if (userData.age && userData.age > 50) {
    riskScore += 1;
    keyFactors.push('Age over 50');
  }

  // Age at menarche (Gail Model component)
  if (userData.ageAtMenarche && userData.ageAtMenarche < 12) {
    riskScore += 1;
    keyFactors.push('Early menarche (before age 12)');
  }

  // Pregnancy history (Gail Model component)
  if (userData.pregnancies === 0 && userData.age && userData.age > 30) {
    riskScore += 1;
    keyFactors.push('No pregnancies (nulliparity)');
  } else if (userData.pregnancies && userData.pregnancies > 0) {
    riskScore -= 1; // Protective factor
    recommendations.push({
      category: 'lifestyle',
      priority: 'low',
      action: 'Pregnancy history is protective',
      description: 'Your pregnancy history helps reduce breast cancer risk'
    });
  }

  // Family history - major factor (Gail Model component)
  if (userData.familyHistory?.breast) {
    riskScore += 2;
    keyFactors.push('Family history of breast cancer');
    recommendations.push({
      category: 'screening',
      priority: 'high',
      action: 'Enhanced screening protocol',
      description: 'Discuss earlier and more frequent mammograms with your doctor'
    });
    recommendations.push({
      category: 'medical',
      priority: 'high',
      action: 'Consider genetic counseling',
      description: 'Discuss genetic testing for BRCA mutations'
    });
  }

  // Lifestyle factors
  if (userData.alcoholConsumption === 'moderate' || userData.alcoholConsumption === 'heavy') {
    riskScore += 1;
    keyFactors.push('Regular alcohol consumption');
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Limit alcohol consumption',
      description: 'Reduce alcohol intake to lower breast cancer risk'
    });
  }

  // BMI calculation
  const bmi = userData.weight && userData.height ? 
    userData.weight / Math.pow(userData.height / 100, 2) : undefined;

  if (bmi && bmi > 30) {
    riskScore += 1;
    keyFactors.push('Obesity (BMI > 30)');
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Maintain healthy weight',
      description: 'Weight management can help reduce breast cancer risk'
    });
  }

  // Physical activity (protective)
  if (userData.physicalActivity === 'high') {
    riskScore -= 1;
    recommendations.push({
      category: 'lifestyle',
      priority: 'low',
      action: 'Continue regular exercise',
      description: 'Maintain your excellent exercise routine'
    });
  } else {
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Increase physical activity',
      description: 'Regular exercise can help reduce breast cancer risk'
    });
  }

  // Screening recommendations
  if (userData.mammogramHistory === 'never' && userData.age && userData.age >= 40) {
    recommendations.push({
      category: 'screening',
      priority: 'high',
      action: 'Start mammography screening',
      description: 'Begin regular mammograms as recommended by your doctor'
    });
  } else if (userData.mammogramHistory === 'regular') {
    recommendations.push({
      category: 'screening',
      priority: 'medium',
      action: 'Continue regular screening',
      description: 'Maintain your excellent screening routine'
    });
  }

  recommendations.push({
    category: 'lifestyle',
    priority: 'medium',
    action: 'Perform breast self-exams',
    description: 'Monthly self-examinations can help detect changes early'
  });

  const riskLevel = riskScore >= 8 ? 'High' : riskScore >= 6 ? 'Elevated' : riskScore >= 4 ? 'Average' : 'Low';

  return {
    cancerType: 'Breast Cancer',
    riskLevel,
    riskScore: Math.min(riskScore, 10),
    keyFactors,
    recommendations,
    riskModel: 'Simplified Gail Model'
  };
}

function calculateBasicColorectalCancerRisk(userData: BasicUserData): BasicRiskAssessment {
  let riskScore = 2; // Base score
  const keyFactors: string[] = [];
  const recommendations: BasicRecommendation[] = [];

  // Age factor (CCRAT component)
  if (userData.age && userData.age > 65) {
    riskScore += 2;
    keyFactors.push('Age over 65 (major risk factor)');
  } else if (userData.age && userData.age > 50) {
    riskScore += 1;
    keyFactors.push('Age over 50');
  }

  // Family history (CCRAT component)
  if (userData.familyHistory?.colorectal) {
    riskScore += 2;
    keyFactors.push('Family history of colorectal cancer');
    recommendations.push({
      category: 'screening',
      priority: 'high',
      action: 'Start screening earlier',
      description: 'Begin colonoscopy screening before age 50'
    });
  }

  // Diet factors (CCRAT components)
  if (userData.redMeatConsumption === 'daily') {
    riskScore += 1;
    keyFactors.push('High red meat consumption');
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Reduce red meat intake',
      description: 'Limit red meat to 2-3 servings per week'
    });
  }

  if (userData.fruitsVegetables === '0-1' || userData.fruitsVegetables === '2-3') {
    riskScore += 1;
    keyFactors.push('Low fruit and vegetable intake');
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Increase fruits and vegetables',
      description: 'Aim for 5-9 servings of fruits and vegetables daily'
    });
  }

  // Physical activity (CCRAT component)
  if (userData.physicalActivity === 'none' || userData.physicalActivity === 'low') {
    riskScore += 1;
    keyFactors.push('Sedentary lifestyle');
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Increase physical activity',
      description: 'Aim for 150 minutes of moderate exercise per week'
    });
  }

  // BMI (CCRAT component)
  const bmi = userData.weight && userData.height ? 
    userData.weight / Math.pow(userData.height / 100, 2) : undefined;

  if (bmi && bmi > 30) {
    riskScore += 1;
    keyFactors.push('Obesity (BMI > 30)');
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Achieve healthy weight',
      description: 'Weight loss can help reduce colorectal cancer risk'
    });
  }

  // Alcohol (CCRAT component)
  if (userData.alcoholConsumption === 'heavy') {
    riskScore += 1;
    keyFactors.push('Heavy alcohol consumption');
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Reduce alcohol consumption',
      description: 'Limit alcohol to moderate levels'
    });
  }

  // Screening recommendations
  if (userData.colonoscopyHistory === 'never' && userData.age && userData.age >= 45) {
    recommendations.push({
      category: 'screening',
      priority: 'high',
      action: 'Start colonoscopy screening',
      description: 'Begin regular colorectal cancer screening'
    });
  }

  const riskLevel = riskScore >= 8 ? 'High' : riskScore >= 6 ? 'Elevated' : riskScore >= 4 ? 'Average' : 'Low';

  return {
    cancerType: 'Colorectal Cancer',
    riskLevel,
    riskScore: Math.min(riskScore, 10),
    keyFactors,
    recommendations,
    riskModel: 'Simplified CCRAT'
  };
}

function calculateBasicSkinCancerRisk(userData: BasicUserData): BasicRiskAssessment {
  let riskScore = 2; // Base score
  const keyFactors: string[] = [];
  const recommendations: BasicRecommendation[] = [];

  // Skin type - major factor (MRAT component)
  if (userData.skinType === '1' || userData.skinType === '2') {
    riskScore += 3;
    keyFactors.push('Very fair skin (burns easily)');
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Use high SPF sunscreen daily',
      description: 'Apply SPF 30+ sunscreen every day, even indoors'
    });
  } else if (userData.skinType === '3') {
    riskScore += 1;
    keyFactors.push('Fair to medium skin tone');
  }

  // Sun exposure (MRAT component)
  if (userData.sunExposure === 'high') {
    riskScore += 2;
    keyFactors.push('High sun exposure');
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Reduce sun exposure',
      description: 'Seek shade during peak hours (10am-4pm) and wear protective clothing'
    });
  } else if (userData.sunExposure === 'moderate') {
    riskScore += 1;
    keyFactors.push('Moderate sun exposure');
  }

  // Family history
  if (userData.familyHistory?.skin) {
    riskScore += 1;
    keyFactors.push('Family history of skin cancer');
    recommendations.push({
      category: 'screening',
      priority: 'high',
      action: 'Annual skin cancer screening',
      description: 'Get professional skin examinations yearly'
    });
  }

  // Age factor
  if (userData.age && userData.age > 65) {
    riskScore += 1;
    keyFactors.push('Age over 65');
  }

  // General recommendations
  recommendations.push({
    category: 'lifestyle',
    priority: 'high',
    action: 'Perform monthly skin self-exams',
    description: 'Check your skin monthly for new or changing moles'
  });

  recommendations.push({
    category: 'lifestyle',
    priority: 'medium',
    action: 'Avoid tanning beds',
    description: 'Never use tanning beds or sun lamps'
  });

  const riskLevel = riskScore >= 8 ? 'High' : riskScore >= 6 ? 'Elevated' : riskScore >= 4 ? 'Average' : 'Low';

  return {
    cancerType: 'Skin Cancer/Melanoma',
    riskLevel,
    riskScore: Math.min(riskScore, 10),
    keyFactors,
    recommendations,
    riskModel: 'Simplified MRAT'
  };
}

function calculateBasicProstateCancerRisk(userData: BasicUserData): BasicRiskAssessment {
  let riskScore = 3; // Base score for men
  const keyFactors: string[] = [];
  const recommendations: BasicRecommendation[] = [];

  // Age factor - major for prostate cancer
  if (userData.age && userData.age > 70) {
    riskScore += 3;
    keyFactors.push('Age over 70 (major risk factor)');
  } else if (userData.age && userData.age > 60) {
    riskScore += 2;
    keyFactors.push('Age over 60');
  } else if (userData.age && userData.age > 50) {
    riskScore += 1;
    keyFactors.push('Age over 50');
  }

  // Race factor
  if (userData.raceEthnicity === 'black') {
    riskScore += 2;
    keyFactors.push('African American ethnicity (higher risk)');
    recommendations.push({
      category: 'screening',
      priority: 'high',
      action: 'Start screening at age 45',
      description: 'Begin PSA testing earlier due to higher risk'
    });
  }

  // Family history
  if (userData.familyHistory?.prostate) {
    riskScore += 2;
    keyFactors.push('Family history of prostate cancer');
    recommendations.push({
      category: 'screening',
      priority: 'high',
      action: 'Enhanced screening protocol',
      description: 'Discuss earlier and more frequent PSA testing'
    });
  }

  // Lifestyle factors
  if (userData.redMeatConsumption === 'daily') {
    riskScore += 1;
    keyFactors.push('High red meat consumption');
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Reduce red meat intake',
      description: 'Limit red meat and increase fish consumption'
    });
  }

  // Physical activity (protective)
  if (userData.physicalActivity === 'high') {
    riskScore -= 1;
    recommendations.push({
      category: 'lifestyle',
      priority: 'low',
      action: 'Continue regular exercise',
      description: 'Maintain your excellent exercise routine'
    });
  } else {
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Increase physical activity',
      description: 'Regular exercise may help reduce prostate cancer risk'
    });
  }

  // Diet recommendations
  recommendations.push({
    category: 'lifestyle',
    priority: 'medium',
    action: 'Eat tomato-based foods',
    description: 'Include lycopene-rich foods like tomatoes in your diet'
  });

  // Screening recommendations
  if (userData.age && userData.age >= 50) {
    recommendations.push({
      category: 'screening',
      priority: 'high',
      action: 'Discuss PSA screening',
      description: 'Talk to your doctor about prostate cancer screening'
    });
  }

  const riskLevel = riskScore >= 8 ? 'High' : riskScore >= 6 ? 'Elevated' : riskScore >= 4 ? 'Average' : 'Low';

  return {
    cancerType: 'Prostate Cancer',
    riskLevel,
    riskScore: Math.min(riskScore, 10),
    keyFactors,
    recommendations
  };
}

function calculateBasicOvarianCancerRisk(userData: BasicUserData): BasicRiskAssessment {
  let riskScore = 2; // Base score for women
  const keyFactors: string[] = [];
  const recommendations: BasicRecommendation[] = [];

  // Age factor
  if (userData.age && userData.age > 65) {
    riskScore += 2;
    keyFactors.push('Age over 65 (major risk factor)');
  } else if (userData.age && userData.age > 50) {
    riskScore += 1;
    keyFactors.push('Age over 50');
  }

  // Family history - major factor
  if (userData.familyHistory?.ovarian || userData.familyHistory?.breast) {
    riskScore += 2;
    keyFactors.push('Family history of ovarian/breast cancer');
    recommendations.push({
      category: 'medical',
      priority: 'high',
      action: 'Consider genetic counseling',
      description: 'Discuss BRCA testing due to family history'
    });
  }

  // Pregnancy history (protective)
  if (userData.pregnancies === 0) {
    riskScore += 1;
    keyFactors.push('No pregnancies (nulliparity)');
  } else if (userData.pregnancies && userData.pregnancies > 0) {
    riskScore -= 1; // Protective
  }

  // General recommendations
  recommendations.push({
    category: 'screening',
    priority: 'medium',
    action: 'Regular pelvic exams',
    description: 'Maintain regular gynecological check-ups'
  });

  recommendations.push({
    category: 'lifestyle',
    priority: 'medium',
    action: 'Know the symptoms',
    description: 'Be aware of persistent bloating, pelvic pain, and urinary symptoms'
  });

  const riskLevel = riskScore >= 8 ? 'High' : riskScore >= 6 ? 'Elevated' : riskScore >= 4 ? 'Average' : 'Low';

  return {
    cancerType: 'Ovarian Cancer',
    riskLevel,
    riskScore: Math.min(riskScore, 10),
    keyFactors,
    recommendations
  };
}

function calculateBasicPancreaticCancerRisk(userData: BasicUserData): BasicRiskAssessment {
  let riskScore = 1; // Base score (relatively rare cancer)
  const keyFactors: string[] = [];
  const recommendations: BasicRecommendation[] = [];

  // Age factor
  if (userData.age && userData.age > 65) {
    riskScore += 2;
    keyFactors.push('Age over 65 (major risk factor)');
  } else if (userData.age && userData.age > 50) {
    riskScore += 1;
    keyFactors.push('Age over 50');
  }

  // Smoking - major risk factor
  if (userData.smokingStatus === 'current') {
    riskScore += 2;
    keyFactors.push('Current smoking');
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Quit smoking',
      description: 'Smoking significantly increases pancreatic cancer risk'
    });
  } else if (userData.smokingStatus === 'former') {
    riskScore += 1;
    keyFactors.push('Former smoking history');
  }

  // Family history
  if (userData.familyHistory?.pancreatic) {
    riskScore += 2;
    keyFactors.push('Family history of pancreatic cancer');
    recommendations.push({
      category: 'medical',
      priority: 'high',
      action: 'Discuss with oncologist',
      description: 'Consider genetic counseling for hereditary pancreatic cancer'
    });
  }

  // BMI
  const bmi = userData.weight && userData.height ? 
    userData.weight / Math.pow(userData.height / 100, 2) : undefined;

  if (bmi && bmi > 30) {
    riskScore += 1;
    keyFactors.push('Obesity (BMI > 30)');
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Maintain healthy weight',
      description: 'Weight management may help reduce pancreatic cancer risk'
    });
  }

  // General recommendations
  recommendations.push({
    category: 'lifestyle',
    priority: 'medium',
    action: 'Maintain healthy diet',
    description: 'Eat plenty of fruits, vegetables, and whole grains'
  });

  const riskLevel = riskScore >= 8 ? 'High' : riskScore >= 6 ? 'Elevated' : riskScore >= 4 ? 'Average' : 'Low';

  return {
    cancerType: 'Pancreatic Cancer',
    riskLevel,
    riskScore: Math.min(riskScore, 10),
    keyFactors,
    recommendations
  };
}