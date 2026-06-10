export interface Product {
  id: string;
  name: string;
  badge: string;
  description: string;
  techSpecs: string[];
}

export interface ValueCard {
  id: string;
  title: string;
  description: string;
  iconName: "heart" | "sparkles" | "shield" | "compass";
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface VisionPillar {
  id: string;
  title: string;
  description: string;
  focusText: string;
}

export interface ContactData {
  name: string;
  email: string;
  organization: string;
  inquiryType: string;
  message: string;
}
