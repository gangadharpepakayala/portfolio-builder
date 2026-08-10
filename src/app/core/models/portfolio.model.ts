export type ThemePresetKey =
  | 'dark'
  | 'light'
  | 'blue'
  | 'purple'
  | 'emerald'
  | 'orange'
  | 'minimal'
  | 'corporate'
  | 'developer'
  | 'glassmorphism'
  | 'neumorphism';

export interface ColorSettings {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  sectionBg: string;
  text: string;
  heading: string;
  link: string;
  button: string;
  buttonHover: string;
  cardBg: string;
  borderColor: string;
  footerBg: string;
  headerBg: string;
  navbarBg: string;
  selectionColor: string;
}

export interface TypographySettings {
  fontFamily: string;
  headingSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  paragraphSize: 'sm' | 'md' | 'lg';
  lineHeight: 'tight' | 'normal' | 'relaxed' | 'loose';
  letterSpacing: 'tight' | 'normal' | 'wide';
  fontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
}

export interface LayoutSettings {
  containerWidth: 'max-w-5xl' | 'max-w-6xl' | 'max-w-7xl' | 'max-w-full';
  padding: 'compact' | 'normal' | 'spacious';
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  sectionSpacing: 'sm' | 'md' | 'lg' | 'xl';
  animation: 'fade' | 'slide' | 'zoom' | 'bounce' | 'none';
  animationsEnabled: boolean;
}

export interface BaseSectionStyles {
  bgColor?: string;
  titleColor?: string;
  textColor?: string;
  padding?: 'compact' | 'normal' | 'spacious';
}

export interface NavbarSection {
  visible: boolean;
  logoText: string;
  logoColor?: string;
  logoImage?: string;
  isSticky: boolean;
  isTransparent: boolean;
  hasShadow: boolean;
  bgColor?: string;
  menuColor: string;
  activeColor: string;
  hoverColor: string;
  links: Array<{ label: string; sectionId: string; visible: boolean }>;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface HeroSection extends BaseSectionStyles {
  id: 'hero';
  visible: boolean;
  name: string;
  nameColor?: string;
  role: string;
  roleColor?: string;
  description: string;
  descColor?: string;
  profileImage: string;
  imageShape: 'rounded' | 'circle' | 'square';
  imageBorder: boolean;
  imageShadow: boolean;
  imageOpacity: number;
  ctaPrimaryLabel: string;
  ctaPrimaryUrl: string;
  resumeUrl?: string;
  resumeFileName?: string;
  ctaPrimaryBg?: string;
  ctaPrimaryColor?: string;
  ctaSecondaryLabel: string;
  ctaSecondaryUrl: string;
  socialLinks: SocialLink[];
  bgType: 'solid' | 'gradient' | 'image' | 'pattern';
  bgGradientFrom: string;
  bgGradientTo: string;
  height: 'auto' | 'screen' | 'compact';
  alignment: 'left' | 'center' | 'right';
}

export interface PersonalDetails {
  fullName?: string;
  age?: string;
  location?: string;
  nationality?: string;
  email?: string;
  phone?: string;
  languages?: string;
  freelanceStatus?: string;
  currentRole?: string;
}

export interface PersonalDetailItem {
  id: string;
  label: string;
  value: string;
}

export interface AboutSection extends BaseSectionStyles {
  id: 'about';
  visible: boolean;
  title: string;
  subtitle: string;
  subtitleColor?: string;
  description: string;
  highlights: string[];
  image?: string;
  imagePosition?: 'left' | 'right';
  personalDetails: PersonalDetails;
  customDetails?: PersonalDetailItem[];
  experienceYears?: string;
  projectsCount?: string;
  clientsCount?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  percentage: number;
  category: string;
  icon: string;
  color: string;
}

export interface SkillsSection extends BaseSectionStyles {
  id: 'skills';
  visible: boolean;
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  logo: string;
  technologies: string[];
}

export interface ExperienceSection extends BaseSectionStyles {
  id: 'experience';
  visible: boolean;
  title: string;
  subtitle: string;
  experiences: ExperienceItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  liveDemoUrl: string;
  tags: string[];
  featured: boolean;
}

export interface ProjectsSection extends BaseSectionStyles {
  id: 'projects';
  visible: boolean;
  title: string;
  subtitle: string;
  projects: ProjectItem[];
}

export interface EducationItem {
  id: string;
  degree: string;
  college: string;
  duration: string;
  grade: string;
  description: string;
}

export interface EducationSection extends BaseSectionStyles {
  id: 'education';
  visible: boolean;
  title: string;
  subtitle: string;
  items: EducationItem[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  icon?: string;
}

export interface CertificationsSection extends BaseSectionStyles {
  id: 'certifications';
  visible: boolean;
  title: string;
  subtitle: string;
  certifications: CertificationItem[];
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  icon: string;
}

export interface AchievementsSection extends BaseSectionStyles {
  id: 'achievements';
  visible: boolean;
  title: string;
  subtitle: string;
  achievements: AchievementItem[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface TestimonialsSection extends BaseSectionStyles {
  id: 'testimonials';
  visible: boolean;
  title: string;
  subtitle: string;
  testimonials: TestimonialItem[];
}

export interface ContactSection extends BaseSectionStyles {
  id: 'contact';
  visible: boolean;
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  mapEmbedUrl: string;
  socialLinks: SocialLink[];
}

export interface FooterSection {
  id: 'footer';
  visible: boolean;
  copyrightText: string;
  showSocialIcons: boolean;
  bgColor: string;
  textColor: string;
}

export type SectionType =
  | 'hero'
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'education'
  | 'certifications'
  | 'achievements'
  | 'testimonials'
  | 'contact';

export interface PortfolioData {
  themePreset: ThemePresetKey;
  colors: ColorSettings;
  typography: TypographySettings;
  layout: LayoutSettings;
  navbar: NavbarSection;
  hero: HeroSection;
  about: AboutSection;
  skills: SkillsSection;
  experience: ExperienceSection;
  projects: ProjectsSection;
  education: EducationSection;
  certifications: CertificationsSection;
  achievements: AchievementsSection;
  testimonials: TestimonialsSection;
  contact: ContactSection;
  footer: FooterSection;
  sectionOrder: SectionType[];
}
