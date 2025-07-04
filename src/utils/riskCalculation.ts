import { UserData, RiskAssessment, RiskFactor, Recommendation, ScreeningRecommendation } from '../types/UserData';

export function calculateRisks(userData: UserData): RiskAssessment[] {
  const assessments: RiskAssessment[] = [];

  // Primary Focus Cancers
  assessments.push(calculateLungCancerRisk(userData));
  assessments.push(calculateColorectalCancerRisk(userData));
  assessments.push(calculateSkinCancerRisk(userData));

  // Gender-specific cancers
  if (userData.biologicalSex === 'female') {
    assessments.push(calculateBreastCancerRisk(userData));
    assessments.push(calculateCervicalCancerRisk(userData));
    assessments.push(calculateOvarianCancerRisk(userData));
  }

  if (userData.biologicalSex === 'male') {
    assessments.push(calculateProstateCancerRisk(userData));
  }

  // Secondary Focus Cancers
  assessments.push(calculateBladderCancerRisk(userData));
  assessments.push(calculatePancreaticCancerRisk(userData));
  assessments.push(calculateLiverCancerRisk(userData));

  return assessments;
}

function calculateLungCancerRisk(userData: UserData): RiskAssessment {
  let riskMultiplier = 1.0;
  const modifiableFactors: RiskFactor[] = [];
  const nonModifiableFactors: RiskFactor[] = [];
  const recommendations: Recommendation[] = [];
  
  // Base risk varies by age and gender
  let baseRisk = 0.6; // Base lifetime risk
  
  // Age factor (non-modifiable)
  if (userData.age && userData.age > 65) {
    riskMultiplier *= 2.5;
    nonModifiableFactors.push({
      factor: 'Age over 65',
      impact: 'high',
      description: 'Lung cancer risk increases significantly with age'
    });
  } else if (userData.age && userData.age > 50) {
    riskMultiplier *= 1.5;
    nonModifiableFactors.push({
      factor: 'Age over 50',
      impact: 'moderate',
      description: 'Age is a major risk factor for lung cancer'
    });
  }

  // Gender factor
  if (userData.biologicalSex === 'male') {
    riskMultiplier *= 1.2;
    nonModifiableFactors.push({
      factor: 'Male gender',
      impact: 'low',
      description: 'Men have slightly higher lung cancer rates'
    });
  }

  // Race/ethnicity factor
  if (userData.raceEthnicity === 'black') {
    riskMultiplier *= 1.3;
    nonModifiableFactors.push({
      factor: 'African American ethnicity',
      impact: 'moderate',
      description: 'Higher lung cancer rates in African Americans'
    });
  }

  // Smoking - major modifiable risk factor
  if (userData.smokingStatus === 'current') {
    riskMultiplier *= 15;
    modifiableFactors.push({
      factor: 'Current smoking',
      impact: 'high',
      description: 'Smoking is the leading cause of lung cancer'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Quit smoking immediately',
      description: 'Quitting smoking is the most important step to reduce lung cancer risk',
      potentialImpact: 'Can reduce risk by 50% within 5 years'
    });
  } else if (userData.smokingStatus === 'former') {
    const packYears = userData.smokingPackYears || 0;
    if (packYears > 30) {
      riskMultiplier *= 8;
      nonModifiableFactors.push({
        factor: 'Heavy smoking history (>30 pack-years)',
        impact: 'high',
        description: 'Extensive smoking history significantly increases risk'
      });
    } else if (packYears > 20) {
      riskMultiplier *= 5;
      nonModifiableFactors.push({
        factor: 'Moderate smoking history (20-30 pack-years)',
        impact: 'high',
        description: 'Significant smoking history increases risk'
      });
    } else if (packYears > 0) {
      riskMultiplier *= 2;
      nonModifiableFactors.push({
        factor: 'Light smoking history',
        impact: 'moderate',
        description: 'Any smoking history increases lung cancer risk'
      });
    }
  }

  // Secondhand smoke exposure
  if (userData.secondhandSmoke === 'yes') {
    riskMultiplier *= 1.3;
    modifiableFactors.push({
      factor: 'Regular secondhand smoke exposure',
      impact: 'moderate',
      description: 'Secondhand smoke increases lung cancer risk'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Avoid secondhand smoke',
      description: 'Minimize exposure to secondhand smoke at home and work'
    });
  }

  // Family history
  if (userData.familyHistoryParents?.lung || userData.familyHistorySiblings?.lung) {
    riskMultiplier *= 2;
    nonModifiableFactors.push({
      factor: 'Family history of lung cancer',
      impact: 'high',
      description: 'Genetic predisposition increases risk'
    });
  }

  // Occupational exposures
  if (userData.occupationalExposures?.asbestos) {
    riskMultiplier *= 3;
    nonModifiableFactors.push({
      factor: 'Asbestos exposure',
      impact: 'high',
      description: 'Asbestos exposure significantly increases lung cancer risk'
    });
  }

  if (userData.occupationalExposures?.radiation) {
    riskMultiplier *= 1.5;
    nonModifiableFactors.push({
      factor: 'Radiation exposure',
      impact: 'moderate',
      description: 'Occupational radiation exposure increases risk'
    });
  }

  // Environmental factors
  if (userData.airPollution === 'poor') {
    riskMultiplier *= 1.2;
    modifiableFactors.push({
      factor: 'Poor air quality',
      impact: 'low',
      description: 'Air pollution increases lung cancer risk'
    });
  }

  if (userData.radonExposure === 'high') {
    riskMultiplier *= 1.4;
    modifiableFactors.push({
      factor: 'High radon exposure',
      impact: 'moderate',
      description: 'Radon is the second leading cause of lung cancer'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Test and mitigate radon',
      description: 'Test your home for radon and install mitigation if levels are high'
    });
  }

  // Protective factors
  if (userData.physicalActivity === 'high') {
    riskMultiplier *= 0.8;
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Continue regular exercise',
      description: 'Maintain your excellent exercise routine'
    });
  } else {
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Increase physical activity',
      description: 'Regular exercise may help reduce lung cancer risk'
    });
  }

  // Calculate final risk
  const fiveYearRisk = (baseRisk * riskMultiplier * 0.05);
  const tenYearRisk = (baseRisk * riskMultiplier * 0.12);
  const lifetimeRisk = Math.min(baseRisk * riskMultiplier, 85);

  // Determine risk level
  let riskLevel: 'Low' | 'Average' | 'Elevated' | 'High';
  if (lifetimeRisk > 20) riskLevel = 'High';
  else if (lifetimeRisk > 5) riskLevel = 'Elevated';
  else if (lifetimeRisk > 1.5) riskLevel = 'Average';
  else riskLevel = 'Low';

  // Screening recommendations
  const screeningTimeline: ScreeningRecommendation[] = [];
  
  if (userData.age && userData.age >= 50 && userData.smokingPackYears && userData.smokingPackYears >= 20) {
    screeningTimeline.push({
      test: 'Low-dose CT scan',
      startAge: 50,
      frequency: 'Annual',
      priority: 'high-risk'
    });
  }

  // General recommendations
  recommendations.push({
    category: 'screening',
    priority: 'medium',
    action: 'Discuss lung cancer screening',
    description: 'Talk to your doctor about lung cancer screening if you have risk factors'
  });

  recommendations.push({
    category: 'lifestyle',
    priority: 'low',
    action: 'Eat antioxidant-rich foods',
    description: 'Include fruits and vegetables high in antioxidants in your diet'
  });

  return {
    cancerType: 'Lung Cancer',
    riskLevel,
    absoluteRisk: {
      fiveYear: fiveYearRisk,
      tenYear: tenYearRisk,
      lifetime: lifetimeRisk
    },
    relativeRisk: riskMultiplier,
    riskCategory: `${riskLevel} risk based on smoking history and other factors`,
    modifiableFactors,
    nonModifiableFactors,
    recommendations,
    screeningTimeline,
    riskReductionPotential: userData.smokingStatus === 'current' ? 50 : 20
  };
}

function calculateBreastCancerRisk(userData: UserData): RiskAssessment {
  let riskMultiplier = 1.0;
  const modifiableFactors: RiskFactor[] = [];
  const nonModifiableFactors: RiskFactor[] = [];
  const recommendations: Recommendation[] = [];
  
  const baseRisk = 12.9; // Base lifetime risk for women

  // Age factor
  if (userData.age && userData.age > 65) {
    riskMultiplier *= 2.0;
    nonModifiableFactors.push({
      factor: 'Age over 65',
      impact: 'high',
      description: 'Breast cancer risk increases significantly with age'
    });
  } else if (userData.age && userData.age > 50) {
    riskMultiplier *= 1.5;
    nonModifiableFactors.push({
      factor: 'Age over 50',
      impact: 'moderate',
      description: 'Most breast cancers occur after age 50'
    });
  }

  // Race/ethnicity
  if (userData.raceEthnicity === 'white') {
    riskMultiplier *= 1.1;
    nonModifiableFactors.push({
      factor: 'White ethnicity',
      impact: 'low',
      description: 'Slightly higher breast cancer rates in white women'
    });
  } else if (userData.raceEthnicity === 'black') {
    riskMultiplier *= 1.0;
    nonModifiableFactors.push({
      factor: 'African American ethnicity',
      impact: 'moderate',
      description: 'Higher rates of aggressive breast cancer subtypes'
    });
  }

  // Family history - major risk factor
  if (userData.familyHistoryParents?.breast || userData.familyHistorySiblings?.breast) {
    riskMultiplier *= 2.1;
    nonModifiableFactors.push({
      factor: 'Family history of breast cancer',
      impact: 'high',
      description: 'Strong family history significantly increases risk'
    });
    recommendations.push({
      category: 'genetic',
      priority: 'high',
      action: 'Consider genetic counseling',
      description: 'Discuss genetic testing for BRCA mutations with your doctor'
    });
  }

  // Genetic testing results
  if (userData.geneticTesting === 'positive') {
    riskMultiplier *= 5.0;
    nonModifiableFactors.push({
      factor: 'BRCA or other genetic mutation',
      impact: 'high',
      description: 'Genetic mutations dramatically increase breast cancer risk'
    });
    recommendations.push({
      category: 'screening',
      priority: 'high',
      action: 'Enhanced screening protocol',
      description: 'Follow high-risk screening guidelines with MRI and mammography'
    });
  }

  // Reproductive factors
  if (userData.ageAtMenarche && userData.ageAtMenarche < 12) {
    riskMultiplier *= 1.2;
    nonModifiableFactors.push({
      factor: 'Early menarche (before age 12)',
      impact: 'low',
      description: 'Early onset of menstruation increases lifetime estrogen exposure'
    });
  }

  if (userData.pregnancies === 0) {
    riskMultiplier *= 1.3;
    nonModifiableFactors.push({
      factor: 'No pregnancies',
      impact: 'moderate',
      description: 'Nulliparity increases breast cancer risk'
    });
  } else if (userData.ageAtFirstBirth && userData.ageAtFirstBirth > 30) {
    riskMultiplier *= 1.2;
    nonModifiableFactors.push({
      factor: 'First pregnancy after age 30',
      impact: 'low',
      description: 'Late first pregnancy slightly increases risk'
    });
  }

  // Breastfeeding (protective)
  if (userData.breastfeedingMonths && userData.breastfeedingMonths > 12) {
    riskMultiplier *= 0.9;
    recommendations.push({
      category: 'lifestyle',
      priority: 'low',
      action: 'Breastfeeding was protective',
      description: 'Your breastfeeding history helped reduce your risk'
    });
  }

  // Hormone use
  if (userData.birthControlUse === 'long') {
    riskMultiplier *= 1.1;
    modifiableFactors.push({
      factor: 'Long-term birth control use',
      impact: 'low',
      description: 'Extended oral contraceptive use slightly increases risk'
    });
  }

  if (userData.hrtUse === 'current' || userData.hrtUse === 'former_long') {
    riskMultiplier *= 1.3;
    modifiableFactors.push({
      factor: 'Hormone replacement therapy',
      impact: 'moderate',
      description: 'HRT increases breast cancer risk'
    });
    if (userData.hrtUse === 'current') {
      recommendations.push({
        category: 'medical',
        priority: 'medium',
        action: 'Discuss HRT risks with doctor',
        description: 'Review the benefits and risks of continuing hormone therapy'
      });
    }
  }

  // Lifestyle factors
  if (userData.alcoholConsumption === 'moderate' || userData.alcoholConsumption === 'heavy') {
    riskMultiplier *= 1.2;
    modifiableFactors.push({
      factor: 'Regular alcohol consumption',
      impact: 'moderate',
      description: 'Alcohol increases breast cancer risk'
    });
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

  if (bmi && bmi > 30 && userData.menopauseStatus === 'postmenopausal') {
    riskMultiplier *= 1.2;
    modifiableFactors.push({
      factor: 'Obesity after menopause',
      impact: 'moderate',
      description: 'Obesity increases breast cancer risk in postmenopausal women'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Maintain healthy weight',
      description: 'Weight management can help reduce breast cancer risk'
    });
  }

  // Physical activity (protective)
  if (userData.physicalActivity === 'high') {
    riskMultiplier *= 0.9;
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
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

  // Calculate final risk
  const fiveYearRisk = (baseRisk * riskMultiplier * 0.05);
  const tenYearRisk = (baseRisk * riskMultiplier * 0.12);
  const lifetimeRisk = Math.min(baseRisk * riskMultiplier, 85);

  // Determine risk level
  let riskLevel: 'Low' | 'Average' | 'Elevated' | 'High';
  if (lifetimeRisk > 25) riskLevel = 'High';
  else if (lifetimeRisk > 18) riskLevel = 'Elevated';
  else if (lifetimeRisk > 10) riskLevel = 'Average';
  else riskLevel = 'Low';

  // Screening recommendations
  const screeningTimeline: ScreeningRecommendation[] = [];
  
  if (userData.age && userData.age >= 40) {
    if (riskLevel === 'High') {
      screeningTimeline.push({
        test: 'Mammography + MRI',
        startAge: 30,
        frequency: 'Annual',
        priority: 'high-risk'
      });
    } else {
      screeningTimeline.push({
        test: 'Mammography',
        startAge: 50,
        frequency: 'Every 2 years',
        priority: 'routine'
      });
    }
  }

  // General recommendations
  recommendations.push({
    category: 'screening',
    priority: 'high',
    action: 'Follow mammography guidelines',
    description: 'Regular mammograms are crucial for early detection'
  });

  recommendations.push({
    category: 'lifestyle',
    priority: 'medium',
    action: 'Perform breast self-exams',
    description: 'Monthly breast self-examinations can help detect changes early'
  });

  return {
    cancerType: 'Breast Cancer',
    riskLevel,
    absoluteRisk: {
      fiveYear: fiveYearRisk,
      tenYear: tenYearRisk,
      lifetime: lifetimeRisk
    },
    relativeRisk: riskMultiplier,
    riskCategory: `${riskLevel} risk based on hormonal and lifestyle factors`,
    modifiableFactors,
    nonModifiableFactors,
    recommendations,
    screeningTimeline,
    riskReductionPotential: 25
  };
}

function calculateColorectalCancerRisk(userData: UserData): RiskAssessment {
  let riskMultiplier = 1.0;
  const modifiableFactors: RiskFactor[] = [];
  const nonModifiableFactors: RiskFactor[] = [];
  const recommendations: Recommendation[] = [];
  
  const baseRisk = 4.3; // Base lifetime risk

  // Age factor
  if (userData.age && userData.age > 65) {
    riskMultiplier *= 2.5;
    nonModifiableFactors.push({
      factor: 'Age over 65',
      impact: 'high',
      description: 'Colorectal cancer risk increases significantly with age'
    });
  } else if (userData.age && userData.age > 50) {
    riskMultiplier *= 1.8;
    nonModifiableFactors.push({
      factor: 'Age over 50',
      impact: 'moderate',
      description: 'Most colorectal cancers occur after age 50'
    });
  }

  // Gender factor
  if (userData.biologicalSex === 'male') {
    riskMultiplier *= 1.1;
    nonModifiableFactors.push({
      factor: 'Male gender',
      impact: 'low',
      description: 'Men have slightly higher colorectal cancer rates'
    });
  }

  // Race/ethnicity
  if (userData.raceEthnicity === 'black') {
    riskMultiplier *= 1.3;
    nonModifiableFactors.push({
      factor: 'African American ethnicity',
      impact: 'moderate',
      description: 'Higher colorectal cancer rates in African Americans'
    });
  }

  // Family history
  if (userData.familyHistoryParents?.colorectal || userData.familyHistorySiblings?.colorectal) {
    riskMultiplier *= 2.2;
    nonModifiableFactors.push({
      factor: 'Family history of colorectal cancer',
      impact: 'high',
      description: 'Strong family history significantly increases risk'
    });
    recommendations.push({
      category: 'screening',
      priority: 'high',
      action: 'Start screening earlier',
      description: 'Begin colonoscopy screening at age 40 or 10 years before family member\'s diagnosis'
    });
  }

  // Personal history
  if (userData.colonoscopyHistory === 'polyps') {
    riskMultiplier *= 1.5;
    nonModifiableFactors.push({
      factor: 'History of polyps',
      impact: 'moderate',
      description: 'Previous polyps increase future cancer risk'
    });
  }

  // Chronic conditions
  if (userData.chronicConditions?.ibd) {
    riskMultiplier *= 2.0;
    nonModifiableFactors.push({
      factor: 'Inflammatory bowel disease',
      impact: 'high',
      description: 'IBD significantly increases colorectal cancer risk'
    });
  }

  if (userData.chronicConditions?.diabetes) {
    riskMultiplier *= 1.3;
    nonModifiableFactors.push({
      factor: 'Diabetes',
      impact: 'moderate',
      description: 'Diabetes increases colorectal cancer risk'
    });
  }

  // Lifestyle factors - Diet
  if (userData.redMeatConsumption === 'daily') {
    riskMultiplier *= 1.3;
    modifiableFactors.push({
      factor: 'High red meat consumption',
      impact: 'moderate',
      description: 'Daily red meat consumption increases risk'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Reduce red meat intake',
      description: 'Limit red meat to 2-3 servings per week'
    });
  }

  if (userData.processedMeat === 'daily' || userData.processedMeat === 'weekly') {
    riskMultiplier *= 1.2;
    modifiableFactors.push({
      factor: 'Processed meat consumption',
      impact: 'moderate',
      description: 'Processed meats are linked to colorectal cancer'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Avoid processed meats',
      description: 'Eliminate or significantly reduce processed meat consumption'
    });
  }

  if (userData.fruitsVegetables === '0-1' || userData.fruitsVegetables === '2-3') {
    riskMultiplier *= 1.2;
    modifiableFactors.push({
      factor: 'Low fruit and vegetable intake',
      impact: 'moderate',
      description: 'Insufficient fiber and antioxidants increase risk'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Increase fruits and vegetables',
      description: 'Aim for 5-9 servings of fruits and vegetables daily'
    });
  } else if (userData.fruitsVegetables === '6+') {
    riskMultiplier *= 0.9;
    recommendations.push({
      category: 'lifestyle',
      priority: 'low',
      action: 'Continue healthy diet',
      description: 'Maintain your excellent fruit and vegetable intake'
    });
  }

  // Physical activity
  if (userData.physicalActivity === 'none' || userData.physicalActivity === 'low') {
    riskMultiplier *= 1.3;
    modifiableFactors.push({
      factor: 'Sedentary lifestyle',
      impact: 'moderate',
      description: 'Lack of physical activity increases colorectal cancer risk'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Increase physical activity',
      description: 'Aim for 150 minutes of moderate exercise per week'
    });
  } else if (userData.physicalActivity === 'high') {
    riskMultiplier *= 0.8;
    recommendations.push({
      category: 'lifestyle',
      priority: 'low',
      action: 'Continue regular exercise',
      description: 'Maintain your excellent exercise routine'
    });
  }

  // BMI
  const bmi = userData.weight && userData.height ? 
    userData.weight / Math.pow(userData.height / 100, 2) : undefined;

  if (bmi && bmi > 30) {
    riskMultiplier *= 1.3;
    modifiableFactors.push({
      factor: 'Obesity (BMI > 30)',
      impact: 'moderate',
      description: 'Obesity increases colorectal cancer risk'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Achieve healthy weight',
      description: 'Weight loss can help reduce colorectal cancer risk'
    });
  }

  // Alcohol consumption
  if (userData.alcoholConsumption === 'heavy') {
    riskMultiplier *= 1.4;
    modifiableFactors.push({
      factor: 'Heavy alcohol consumption',
      impact: 'moderate',
      description: 'Heavy drinking increases colorectal cancer risk'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Reduce alcohol consumption',
      description: 'Limit alcohol to moderate levels (1-2 drinks per day max)'
    });
  }

  // Smoking
  if (userData.smokingStatus === 'current') {
    riskMultiplier *= 1.2;
    modifiableFactors.push({
      factor: 'Current smoking',
      impact: 'moderate',
      description: 'Smoking increases colorectal cancer risk'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Quit smoking',
      description: 'Smoking cessation reduces colorectal cancer risk'
    });
  }

  // Calculate final risk
  const fiveYearRisk = (baseRisk * riskMultiplier * 0.08);
  const tenYearRisk = (baseRisk * riskMultiplier * 0.18);
  const lifetimeRisk = Math.min(baseRisk * riskMultiplier, 85);

  // Determine risk level
  let riskLevel: 'Low' | 'Average' | 'Elevated' | 'High';
  if (lifetimeRisk > 10) riskLevel = 'High';
  else if (lifetimeRisk > 6) riskLevel = 'Elevated';
  else if (lifetimeRisk > 3) riskLevel = 'Average';
  else riskLevel = 'Low';

  // Screening recommendations
  const screeningTimeline: ScreeningRecommendation[] = [];
  
  if (userData.age && userData.age >= 45) {
    if (riskLevel === 'High') {
      screeningTimeline.push({
        test: 'Colonoscopy',
        startAge: 40,
        frequency: 'Every 5 years',
        priority: 'high-risk'
      });
    } else {
      screeningTimeline.push({
        test: 'Colonoscopy or FIT test',
        startAge: 45,
        frequency: 'Colonoscopy every 10 years or FIT annually',
        priority: 'routine'
      });
    }
  }

  // General recommendations
  recommendations.push({
    category: 'screening',
    priority: 'high',
    action: 'Follow colonoscopy guidelines',
    description: 'Regular screening is the most effective way to prevent colorectal cancer'
  });

  return {
    cancerType: 'Colorectal Cancer',
    riskLevel,
    absoluteRisk: {
      fiveYear: fiveYearRisk,
      tenYear: tenYearRisk,
      lifetime: lifetimeRisk
    },
    relativeRisk: riskMultiplier,
    riskCategory: `${riskLevel} risk based on lifestyle and family history`,
    modifiableFactors,
    nonModifiableFactors,
    recommendations,
    screeningTimeline,
    riskReductionPotential: 40
  };
}

function calculateSkinCancerRisk(userData: UserData): RiskAssessment {
  let riskMultiplier = 1.0;
  const modifiableFactors: RiskFactor[] = [];
  const nonModifiableFactors: RiskFactor[] = [];
  const recommendations: Recommendation[] = [];
  
  const baseRisk = 2.0; // Base lifetime risk for melanoma

  // Skin type (major factor)
  if (userData.skinType === '1' || userData.skinType === '2') {
    riskMultiplier *= 3.0;
    nonModifiableFactors.push({
      factor: 'Very fair skin (Type I-II)',
      impact: 'high',
      description: 'Fair skin burns easily and has higher melanoma risk'
    });
  } else if (userData.skinType === '3') {
    riskMultiplier *= 1.5;
    nonModifiableFactors.push({
      factor: 'Fair to medium skin (Type III)',
      impact: 'moderate',
      description: 'Medium skin tone has moderate melanoma risk'
    });
  } else if (userData.skinType === '4' || userData.skinType === '5' || userData.skinType === '6') {
    riskMultiplier *= 0.5;
    nonModifiableFactors.push({
      factor: 'Darker skin tone',
      impact: 'low',
      description: 'Darker skin provides natural protection against UV damage'
    });
  }

  // Age factor
  if (userData.age && userData.age > 65) {
    riskMultiplier *= 1.5;
    nonModifiableFactors.push({
      factor: 'Age over 65',
      impact: 'moderate',
      description: 'Skin cancer risk increases with age due to cumulative sun damage'
    });
  }

  // Gender factor
  if (userData.biologicalSex === 'male') {
    riskMultiplier *= 1.2;
    nonModifiableFactors.push({
      factor: 'Male gender',
      impact: 'low',
      description: 'Men have slightly higher melanoma rates'
    });
  }

  // Family history
  if (userData.familyHistoryParents?.skin || userData.familyHistorySiblings?.skin) {
    riskMultiplier *= 2.0;
    nonModifiableFactors.push({
      factor: 'Family history of skin cancer',
      impact: 'high',
      description: 'Genetic predisposition to melanoma'
    });
  }

  // Sun exposure history
  if (userData.severeSunburns === '6+') {
    riskMultiplier *= 2.5;
    nonModifiableFactors.push({
      factor: 'Multiple severe sunburns',
      impact: 'high',
      description: 'History of severe sunburns significantly increases risk'
    });
  } else if (userData.severeSunburns === '3-5') {
    riskMultiplier *= 1.8;
    nonModifiableFactors.push({
      factor: 'Several severe sunburns',
      impact: 'moderate',
      description: 'Multiple sunburns increase melanoma risk'
    });
  } else if (userData.severeSunburns === '1-2') {
    riskMultiplier *= 1.3;
    nonModifiableFactors.push({
      factor: 'Some severe sunburns',
      impact: 'low',
      description: 'Any severe sunburn increases risk'
    });
  }

  // Tanning bed use
  if (userData.tanningBedUse === 'regular') {
    riskMultiplier *= 2.0;
    modifiableFactors.push({
      factor: 'Regular tanning bed use',
      impact: 'high',
      description: 'Tanning beds significantly increase melanoma risk'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Stop using tanning beds',
      description: 'Eliminate tanning bed use completely'
    });
  } else if (userData.tanningBedUse === 'occasional') {
    riskMultiplier *= 1.3;
    modifiableFactors.push({
      factor: 'Occasional tanning bed use',
      impact: 'moderate',
      description: 'Any tanning bed use increases risk'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Avoid tanning beds',
      description: 'Stop using tanning beds to reduce risk'
    });
  }

  // Current sun exposure
  if (userData.sunExposure === 'high') {
    riskMultiplier *= 1.5;
    modifiableFactors.push({
      factor: 'High sun exposure',
      impact: 'moderate',
      description: 'Frequent sun exposure increases risk'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Improve sun protection',
      description: 'Use sunscreen, protective clothing, and seek shade'
    });
  }

  // Sun protection habits
  if (userData.sunProtection === 'never' || userData.sunProtection === 'sometimes') {
    riskMultiplier *= 1.4;
    modifiableFactors.push({
      factor: 'Poor sun protection habits',
      impact: 'moderate',
      description: 'Inadequate sun protection increases risk'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Use sun protection consistently',
      description: 'Apply SPF 30+ sunscreen daily and wear protective clothing'
    });
  } else if (userData.sunProtection === 'always') {
    riskMultiplier *= 0.8;
    recommendations.push({
      category: 'lifestyle',
      priority: 'low',
      action: 'Continue excellent sun protection',
      description: 'Maintain your consistent sun protection habits'
    });
  }

  // Calculate final risk
  const fiveYearRisk = (baseRisk * riskMultiplier * 0.03);
  const tenYearRisk = (baseRisk * riskMultiplier * 0.08);
  const lifetimeRisk = Math.min(baseRisk * riskMultiplier, 85);

  // Determine risk level
  let riskLevel: 'Low' | 'Average' | 'Elevated' | 'High';
  if (lifetimeRisk > 6) riskLevel = 'High';
  else if (lifetimeRisk > 3) riskLevel = 'Elevated';
  else if (lifetimeRisk > 1.5) riskLevel = 'Average';
  else riskLevel = 'Low';

  // Screening recommendations
  const screeningTimeline: ScreeningRecommendation[] = [];
  
  if (riskLevel === 'High') {
    screeningTimeline.push({
      test: 'Dermatologist skin exam',
      startAge: 18,
      frequency: 'Every 6 months',
      priority: 'high-risk'
    });
  } else {
    screeningTimeline.push({
      test: 'Skin self-exam',
      startAge: 18,
      frequency: 'Monthly',
      priority: 'routine'
    });
    screeningTimeline.push({
      test: 'Professional skin exam',
      startAge: 40,
      frequency: 'Annual',
      priority: 'routine'
    });
  }

  // General recommendations
  recommendations.push({
    category: 'screening',
    priority: 'medium',
    action: 'Perform monthly skin self-exams',
    description: 'Check for new or changing moles regularly'
  });

  recommendations.push({
    category: 'lifestyle',
    priority: 'high',
    action: 'Practice sun safety',
    description: 'Use broad-spectrum SPF 30+ sunscreen, wear protective clothing, and avoid peak sun hours'
  });

  return {
    cancerType: 'Skin Cancer (Melanoma)',
    riskLevel,
    absoluteRisk: {
      fiveYear: fiveYearRisk,
      tenYear: tenYearRisk,
      lifetime: lifetimeRisk
    },
    relativeRisk: riskMultiplier,
    riskCategory: `${riskLevel} risk based on skin type and sun exposure`,
    modifiableFactors,
    nonModifiableFactors,
    recommendations,
    screeningTimeline,
    riskReductionPotential: 50
  };
}

function calculateProstateCancerRisk(userData: UserData): RiskAssessment {
  let riskMultiplier = 1.0;
  const modifiableFactors: RiskFactor[] = [];
  const nonModifiableFactors: RiskFactor[] = [];
  const recommendations: Recommendation[] = [];
  
  const baseRisk = 11.6; // Base lifetime risk for men

  // Age factor (major)
  if (userData.age && userData.age > 70) {
    riskMultiplier *= 3.0;
    nonModifiableFactors.push({
      factor: 'Age over 70',
      impact: 'high',
      description: 'Prostate cancer risk increases dramatically with age'
    });
  } else if (userData.age && userData.age > 60) {
    riskMultiplier *= 2.0;
    nonModifiableFactors.push({
      factor: 'Age over 60',
      impact: 'high',
      description: 'Most prostate cancers occur after age 60'
    });
  } else if (userData.age && userData.age > 50) {
    riskMultiplier *= 1.3;
    nonModifiableFactors.push({
      factor: 'Age over 50',
      impact: 'moderate',
      description: 'Prostate cancer risk begins to increase after 50'
    });
  }

  // Race/ethnicity (major factor)
  if (userData.raceEthnicity === 'black') {
    riskMultiplier *= 2.2;
    nonModifiableFactors.push({
      factor: 'African American ethnicity',
      impact: 'high',
      description: 'African American men have the highest prostate cancer rates'
    });
    recommendations.push({
      category: 'screening',
      priority: 'high',
      action: 'Start screening at age 45',
      description: 'Earlier screening recommended for African American men'
    });
  }

  // Family history
  if (userData.familyHistoryParents?.prostate || userData.familyHistorySiblings?.prostate) {
    riskMultiplier *= 2.5;
    nonModifiableFactors.push({
      factor: 'Family history of prostate cancer',
      impact: 'high',
      description: 'Strong family history significantly increases risk'
    });
    recommendations.push({
      category: 'screening',
      priority: 'high',
      action: 'Start screening at age 45',
      description: 'Earlier screening recommended with family history'
    });
  }

  // Diet factors
  if (userData.redMeatConsumption === 'daily') {
    riskMultiplier *= 1.2;
    modifiableFactors.push({
      factor: 'High red meat consumption',
      impact: 'low',
      description: 'High red meat intake may increase prostate cancer risk'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Reduce red meat intake',
      description: 'Limit red meat and increase plant-based foods'
    });
  }

  if (userData.fruitsVegetables === '6+') {
    riskMultiplier *= 0.9;
    recommendations.push({
      category: 'lifestyle',
      priority: 'low',
      action: 'Continue healthy diet',
      description: 'Maintain your excellent fruit and vegetable intake'
    });
  }

  // Physical activity
  if (userData.physicalActivity === 'high') {
    riskMultiplier *= 0.9;
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Continue regular exercise',
      description: 'Maintain your excellent exercise routine'
    });
  } else if (userData.physicalActivity === 'none' || userData.physicalActivity === 'low') {
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Increase physical activity',
      description: 'Regular exercise may help reduce prostate cancer risk'
    });
  }

  // BMI
  const bmi = userData.weight && userData.height ? 
    userData.weight / Math.pow(userData.height / 100, 2) : undefined;

  if (bmi && bmi > 30) {
    riskMultiplier *= 1.1;
    modifiableFactors.push({
      factor: 'Obesity (BMI > 30)',
      impact: 'low',
      description: 'Obesity may increase risk of aggressive prostate cancer'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'medium',
      action: 'Achieve healthy weight',
      description: 'Weight management may help reduce risk'
    });
  }

  // Calculate final risk
  const fiveYearRisk = (baseRisk * riskMultiplier * 0.06);
  const tenYearRisk = (baseRisk * riskMultiplier * 0.15);
  const lifetimeRisk = Math.min(baseRisk * riskMultiplier, 85);

  // Determine risk level
  let riskLevel: 'Low' | 'Average' | 'Elevated' | 'High';
  if (lifetimeRisk > 20) riskLevel = 'High';
  else if (lifetimeRisk > 15) riskLevel = 'Elevated';
  else if (lifetimeRisk > 8) riskLevel = 'Average';
  else riskLevel = 'Low';

  // Screening recommendations
  const screeningTimeline: ScreeningRecommendation[] = [];
  
  if (userData.age && userData.age >= 45) {
    if (riskLevel === 'High') {
      screeningTimeline.push({
        test: 'PSA test + Digital rectal exam',
        startAge: 45,
        frequency: 'Annual',
        priority: 'high-risk'
      });
    } else {
      screeningTimeline.push({
        test: 'PSA test discussion',
        startAge: 50,
        frequency: 'Every 2 years',
        priority: 'routine'
      });
    }
  }

  // General recommendations
  recommendations.push({
    category: 'screening',
    priority: 'high',
    action: 'Discuss PSA screening with doctor',
    description: 'Have an informed discussion about prostate cancer screening'
  });

  return {
    cancerType: 'Prostate Cancer',
    riskLevel,
    absoluteRisk: {
      fiveYear: fiveYearRisk,
      tenYear: tenYearRisk,
      lifetime: lifetimeRisk
    },
    relativeRisk: riskMultiplier,
    riskCategory: `${riskLevel} risk based on age, race, and family history`,
    modifiableFactors,
    nonModifiableFactors,
    recommendations,
    screeningTimeline,
    riskReductionPotential: 20
  };
}

function calculateCervicalCancerRisk(userData: UserData): RiskAssessment {
  let riskMultiplier = 1.0;
  const modifiableFactors: RiskFactor[] = [];
  const nonModifiableFactors: RiskFactor[] = [];
  const recommendations: Recommendation[] = [];
  
  const baseRisk = 0.6; // Base lifetime risk for women

  // Age factor
  if (userData.age && userData.age > 65) {
    riskMultiplier *= 0.5;
    nonModifiableFactors.push({
      factor: 'Age over 65',
      impact: 'low',
      description: 'Cervical cancer risk decreases with age if screening is up to date'
    });
  } else if (userData.age && userData.age >= 30 && userData.age <= 50) {
    riskMultiplier *= 1.2;
    nonModifiableFactors.push({
      factor: 'Peak risk age (30-50)',
      impact: 'moderate',
      description: 'Cervical cancer most commonly occurs in this age range'
    });
  }

  // Screening history (major protective factor)
  if (userData.papSmearHistory === 'never') {
    riskMultiplier *= 5.0;
    modifiableFactors.push({
      factor: 'No Pap smear screening',
      impact: 'high',
      description: 'Lack of screening dramatically increases risk'
    });
    recommendations.push({
      category: 'screening',
      priority: 'high',
      action: 'Start Pap smear screening immediately',
      description: 'Regular Pap smears can prevent most cervical cancers'
    });
  } else if (userData.papSmearHistory === 'irregular') {
    riskMultiplier *= 2.0;
    modifiableFactors.push({
      factor: 'Irregular Pap smear screening',
      impact: 'moderate',
      description: 'Inconsistent screening increases risk'
    });
    recommendations.push({
      category: 'screening',
      priority: 'high',
      action: 'Follow regular screening schedule',
      description: 'Maintain consistent Pap smear screening'
    });
  } else if (userData.papSmearHistory === 'regular') {
    riskMultiplier *= 0.3;
    recommendations.push({
      category: 'screening',
      priority: 'medium',
      action: 'Continue regular screening',
      description: 'Maintain your excellent screening habits'
    });
  }

  // Smoking
  if (userData.smokingStatus === 'current') {
    riskMultiplier *= 2.0;
    modifiableFactors.push({
      factor: 'Current smoking',
      impact: 'high',
      description: 'Smoking significantly increases cervical cancer risk'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Quit smoking',
      description: 'Smoking cessation reduces cervical cancer risk'
    });
  }

  // Calculate final risk
  const fiveYearRisk = (baseRisk * riskMultiplier * 0.08);
  const tenYearRisk = (baseRisk * riskMultiplier * 0.18);
  const lifetimeRisk = Math.min(baseRisk * riskMultiplier, 85);

  // Determine risk level
  let riskLevel: 'Low' | 'Average' | 'Elevated' | 'High';
  if (lifetimeRisk > 2) riskLevel = 'High';
  else if (lifetimeRisk > 1) riskLevel = 'Elevated';
  else if (lifetimeRisk > 0.4) riskLevel = 'Average';
  else riskLevel = 'Low';

  // Screening recommendations
  const screeningTimeline: ScreeningRecommendation[] = [];
  
  if (userData.age && userData.age >= 21) {
    screeningTimeline.push({
      test: 'Pap smear',
      startAge: 21,
      frequency: 'Every 3 years',
      priority: 'routine'
    });
    
    if (userData.age >= 30) {
      screeningTimeline.push({
        test: 'Pap + HPV test',
        startAge: 30,
        frequency: 'Every 5 years',
        priority: 'routine'
      });
    }
  }

  return {
    cancerType: 'Cervical Cancer',
    riskLevel,
    absoluteRisk: {
      fiveYear: fiveYearRisk,
      tenYear: tenYearRisk,
      lifetime: lifetimeRisk
    },
    relativeRisk: riskMultiplier,
    riskCategory: `${riskLevel} risk based on screening history and lifestyle`,
    modifiableFactors,
    nonModifiableFactors,
    recommendations,
    screeningTimeline,
    riskReductionPotential: 80
  };
}

function calculateOvarianCancerRisk(userData: UserData): RiskAssessment {
  let riskMultiplier = 1.0;
  const modifiableFactors: RiskFactor[] = [];
  const nonModifiableFactors: RiskFactor[] = [];
  const recommendations: Recommendation[] = [];
  
  const baseRisk = 1.3; // Base lifetime risk for women

  // Age factor
  if (userData.age && userData.age > 65) {
    riskMultiplier *= 2.0;
    nonModifiableFactors.push({
      factor: 'Age over 65',
      impact: 'high',
      description: 'Ovarian cancer risk increases with age'
    });
  } else if (userData.age && userData.age > 50) {
    riskMultiplier *= 1.5;
    nonModifiableFactors.push({
      factor: 'Age over 50',
      impact: 'moderate',
      description: 'Most ovarian cancers occur after menopause'
    });
  }

  // Family history and genetics
  if (userData.familyHistoryParents?.ovarian || userData.familyHistorySiblings?.ovarian) {
    riskMultiplier *= 3.0;
    nonModifiableFactors.push({
      factor: 'Family history of ovarian cancer',
      impact: 'high',
      description: 'Strong family history significantly increases risk'
    });
    recommendations.push({
      category: 'genetic',
      priority: 'high',
      action: 'Consider genetic counseling',
      description: 'Discuss BRCA testing and risk management options'
    });
  }

  if (userData.geneticTesting === 'positive') {
    riskMultiplier *= 10.0;
    nonModifiableFactors.push({
      factor: 'BRCA mutation',
      impact: 'high',
      description: 'BRCA mutations dramatically increase ovarian cancer risk'
    });
    recommendations.push({
      category: 'medical',
      priority: 'high',
      action: 'Consider prophylactic surgery',
      description: 'Discuss risk-reducing surgery options with your doctor'
    });
  }

  // Reproductive factors
  if (userData.pregnancies === 0) {
    riskMultiplier *= 1.5;
    nonModifiableFactors.push({
      factor: 'No pregnancies',
      impact: 'moderate',
      description: 'Nulliparity increases ovarian cancer risk'
    });
  } else if (userData.pregnancies && userData.pregnancies >= 3) {
    riskMultiplier *= 0.7;
    recommendations.push({
      category: 'lifestyle',
      priority: 'low',
      action: 'Multiple pregnancies were protective',
      description: 'Your pregnancy history helped reduce your risk'
    });
  }

  // Birth control use (protective)
  if (userData.birthControlUse === 'long') {
    riskMultiplier *= 0.6;
    recommendations.push({
      category: 'lifestyle',
      priority: 'low',
      action: 'Birth control use was protective',
      description: 'Long-term oral contraceptive use reduced your risk'
    });
  }

  // Calculate final risk
  const fiveYearRisk = (baseRisk * riskMultiplier * 0.05);
  const tenYearRisk = (baseRisk * riskMultiplier * 0.12);
  const lifetimeRisk = Math.min(baseRisk * riskMultiplier, 85);

  // Determine risk level
  let riskLevel: 'Low' | 'Average' | 'Elevated' | 'High';
  if (lifetimeRisk > 5) riskLevel = 'High';
  else if (lifetimeRisk > 2) riskLevel = 'Elevated';
  else if (lifetimeRisk > 1) riskLevel = 'Average';
  else riskLevel = 'Low';

  return {
    cancerType: 'Ovarian Cancer',
    riskLevel,
    absoluteRisk: {
      fiveYear: fiveYearRisk,
      tenYear: tenYearRisk,
      lifetime: lifetimeRisk
    },
    relativeRisk: riskMultiplier,
    riskCategory: `${riskLevel} risk based on genetics and reproductive history`,
    modifiableFactors,
    nonModifiableFactors,
    recommendations,
    screeningTimeline: [],
    riskReductionPotential: 30
  };
}

function calculateBladderCancerRisk(userData: UserData): RiskAssessment {
  let riskMultiplier = 1.0;
  const modifiableFactors: RiskFactor[] = [];
  const nonModifiableFactors: RiskFactor[] = [];
  const recommendations: Recommendation[] = [];
  
  const baseRisk = 2.4; // Base lifetime risk

  // Age factor
  if (userData.age && userData.age > 65) {
    riskMultiplier *= 2.5;
    nonModifiableFactors.push({
      factor: 'Age over 65',
      impact: 'high',
      description: 'Bladder cancer risk increases significantly with age'
    });
  }

  // Gender factor
  if (userData.biologicalSex === 'male') {
    riskMultiplier *= 3.0;
    nonModifiableFactors.push({
      factor: 'Male gender',
      impact: 'high',
      description: 'Men have much higher bladder cancer rates'
    });
  }

  // Smoking (major risk factor)
  if (userData.smokingStatus === 'current') {
    riskMultiplier *= 4.0;
    modifiableFactors.push({
      factor: 'Current smoking',
      impact: 'high',
      description: 'Smoking is the leading cause of bladder cancer'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Quit smoking immediately',
      description: 'Smoking cessation significantly reduces bladder cancer risk'
    });
  } else if (userData.smokingStatus === 'former') {
    riskMultiplier *= 2.0;
    nonModifiableFactors.push({
      factor: 'Former smoking',
      impact: 'moderate',
      description: 'Previous smoking history increases risk'
    });
  }

  // Calculate final risk
  const fiveYearRisk = (baseRisk * riskMultiplier * 0.06);
  const tenYearRisk = (baseRisk * riskMultiplier * 0.14);
  const lifetimeRisk = Math.min(baseRisk * riskMultiplier, 85);

  // Determine risk level
  let riskLevel: 'Low' | 'Average' | 'Elevated' | 'High';
  if (lifetimeRisk > 8) riskLevel = 'High';
  else if (lifetimeRisk > 4) riskLevel = 'Elevated';
  else if (lifetimeRisk > 2) riskLevel = 'Average';
  else riskLevel = 'Low';

  return {
    cancerType: 'Bladder Cancer',
    riskLevel,
    absoluteRisk: {
      fiveYear: fiveYearRisk,
      tenYear: tenYearRisk,
      lifetime: lifetimeRisk
    },
    relativeRisk: riskMultiplier,
    riskCategory: `${riskLevel} risk based on smoking and demographics`,
    modifiableFactors,
    nonModifiableFactors,
    recommendations,
    screeningTimeline: [],
    riskReductionPotential: userData.smokingStatus === 'current' ? 60 : 20
  };
}

function calculatePancreaticCancerRisk(userData: UserData): RiskAssessment {
  let riskMultiplier = 1.0;
  const modifiableFactors: RiskFactor[] = [];
  const nonModifiableFactors: RiskFactor[] = [];
  const recommendations: Recommendation[] = [];
  
  const baseRisk = 1.6; // Base lifetime risk

  // Age factor
  if (userData.age && userData.age > 65) {
    riskMultiplier *= 2.0;
    nonModifiableFactors.push({
      factor: 'Age over 65',
      impact: 'high',
      description: 'Pancreatic cancer risk increases with age'
    });
  }

  // Family history
  if (userData.familyHistoryParents?.pancreatic || userData.familyHistorySiblings?.pancreatic) {
    riskMultiplier *= 2.5;
    nonModifiableFactors.push({
      factor: 'Family history of pancreatic cancer',
      impact: 'high',
      description: 'Strong family history increases risk'
    });
  }

  // Smoking
  if (userData.smokingStatus === 'current') {
    riskMultiplier *= 2.2;
    modifiableFactors.push({
      factor: 'Current smoking',
      impact: 'high',
      description: 'Smoking doubles pancreatic cancer risk'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Quit smoking',
      description: 'Smoking cessation reduces pancreatic cancer risk'
    });
  }

  // Diabetes
  if (userData.chronicConditions?.diabetes) {
    riskMultiplier *= 1.8;
    nonModifiableFactors.push({
      factor: 'Diabetes',
      impact: 'moderate',
      description: 'Diabetes increases pancreatic cancer risk'
    });
  }

  // Calculate final risk
  const fiveYearRisk = (baseRisk * riskMultiplier * 0.04);
  const tenYearRisk = (baseRisk * riskMultiplier * 0.10);
  const lifetimeRisk = Math.min(baseRisk * riskMultiplier, 85);

  // Determine risk level
  let riskLevel: 'Low' | 'Average' | 'Elevated' | 'High';
  if (lifetimeRisk > 4) riskLevel = 'High';
  else if (lifetimeRisk > 2.5) riskLevel = 'Elevated';
  else if (lifetimeRisk > 1.2) riskLevel = 'Average';
  else riskLevel = 'Low';

  return {
    cancerType: 'Pancreatic Cancer',
    riskLevel,
    absoluteRisk: {
      fiveYear: fiveYearRisk,
      tenYear: tenYearRisk,
      lifetime: lifetimeRisk
    },
    relativeRisk: riskMultiplier,
    riskCategory: `${riskLevel} risk based on family history and lifestyle`,
    modifiableFactors,
    nonModifiableFactors,
    recommendations,
    screeningTimeline: [],
    riskReductionPotential: userData.smokingStatus === 'current' ? 40 : 15
  };
}

function calculateLiverCancerRisk(userData: UserData): RiskAssessment {
  let riskMultiplier = 1.0;
  const modifiableFactors: RiskFactor[] = [];
  const nonModifiableFactors: RiskFactor[] = [];
  const recommendations: Recommendation[] = [];
  
  const baseRisk = 1.0; // Base lifetime risk

  // Gender factor
  if (userData.biologicalSex === 'male') {
    riskMultiplier *= 2.5;
    nonModifiableFactors.push({
      factor: 'Male gender',
      impact: 'high',
      description: 'Men have much higher liver cancer rates'
    });
  }

  // Hepatitis infections
  if (userData.chronicConditions?.hepatitisB) {
    riskMultiplier *= 10.0;
    nonModifiableFactors.push({
      factor: 'Hepatitis B infection',
      impact: 'high',
      description: 'Hepatitis B dramatically increases liver cancer risk'
    });
  }

  if (userData.chronicConditions?.hepatitisC) {
    riskMultiplier *= 8.0;
    nonModifiableFactors.push({
      factor: 'Hepatitis C infection',
      impact: 'high',
      description: 'Hepatitis C significantly increases liver cancer risk'
    });
  }

  // Alcohol consumption
  if (userData.alcoholConsumption === 'heavy') {
    riskMultiplier *= 3.0;
    modifiableFactors.push({
      factor: 'Heavy alcohol consumption',
      impact: 'high',
      description: 'Heavy drinking causes cirrhosis and liver cancer'
    });
    recommendations.push({
      category: 'lifestyle',
      priority: 'high',
      action: 'Reduce alcohol consumption',
      description: 'Limit alcohol to prevent liver damage'
    });
  }

  // Calculate final risk
  const fiveYearRisk = (baseRisk * riskMultiplier * 0.03);
  const tenYearRisk = (baseRisk * riskMultiplier * 0.08);
  const lifetimeRisk = Math.min(baseRisk * riskMultiplier, 85);

  // Determine risk level
  let riskLevel: 'Low' | 'Average' | 'Elevated' | 'High';
  if (lifetimeRisk > 5) riskLevel = 'High';
  else if (lifetimeRisk > 2) riskLevel = 'Elevated';
  else if (lifetimeRisk > 0.8) riskLevel = 'Average';
  else riskLevel = 'Low';

  return {
    cancerType: 'Liver Cancer',
    riskLevel,
    absoluteRisk: {
      fiveYear: fiveYearRisk,
      tenYear: tenYearRisk,
      lifetime: lifetimeRisk
    },
    relativeRisk: riskMultiplier,
    riskCategory: `${riskLevel} risk based on infections and alcohol use`,
    modifiableFactors,
    nonModifiableFactors,
    recommendations,
    screeningTimeline: [],
    riskReductionPotential: userData.alcoholConsumption === 'heavy' ? 50 : 20
  };
}