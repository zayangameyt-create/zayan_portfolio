import { CheckCircle2, Code2, FileText, LifeBuoy, Megaphone, Palette } from 'lucide-react';

const services = [
  {
    id: 'development',
    number: '01',
    title: 'Development',
    description: 'Web, software and mobile app development.',
    icon: Code2,
    groups: [
      {
        title: 'Web Development',
        items: ['Website Design & Development', 'Custom Website Development', 'E-commerce Development', 'Landing Page Development', 'Responsive Web Design'],
      },
      {
        title: 'Software Development',
        items: ['Custom Software Development', 'Business Management Software', 'ERP & CRM Solutions', 'SaaS Application Development', 'API Development & Integration'],
      },
      {
        title: 'Mobile App Development',
        items: ['Android App Development', 'iOS App Development', 'Cross-Platform App Development', 'UI/UX Design'],
      },
      {
        title: 'Additional Development',
        items: ['AI & Automation Solutions', 'E-commerce Solutions', 'Custom Dashboard Development'],
      },
    ],
  },
  {
    id: 'design',
    number: '02',
    title: 'Design',
    description: 'UI/UX, logo and brand identity design.',
    icon: Palette,
    groups: [
      {
        title: 'UI/UX & Graphic Design',
        items: ['UI/UX Design', 'Brand Identity Design', 'Logo Design', 'Business Card Design', 'Brochure & Poster Design', 'Social Media Creatives', 'Mobile App UI/UX Design'],
      },
      {
        title: 'Branding & Creative Solutions',
        items: ['Brand Strategy', 'Brand Identity Development', 'Logo & Visual Identity', 'Corporate Branding', 'Marketing Materials Design'],
      },
      {
        title: 'Website Redesign',
        items: ['Website Redesign', 'Visual Refresh', 'Responsive Layout Improvements'],
      },
    ],
  },
  {
    id: 'testing',
    number: '03',
    title: 'Testing',
    description: 'Quality assurance, automation and performance testing.',
    icon: CheckCircle2,
    groups: [
      {
        title: 'Quality Assurance & Testing',
        items: ['Manual Testing', 'Automation Testing', 'Software Quality Assurance', 'Performance Testing', 'Bug Fixing & Maintenance'],
      },
    ],
  },
  {
    id: 'marketing',
    number: '04',
    title: 'Marketing',
    description: 'SEO, social media and digital marketing.',
    icon: Megaphone,
    groups: [
      {
        title: 'Digital Marketing',
        items: ['Search Engine Optimization (SEO)', 'Social Media Marketing', 'Google Ads & Paid Advertising', 'Digital Brand Promotion', 'Lead Generation'],
      },
    ],
  },
  {
    id: 'content',
    number: '05',
    title: 'Content',
    description: 'Content writing and digital content creation.',
    icon: FileText,
    groups: [
      {
        title: 'Content Marketing',
        items: ['Website Content Writing', 'SEO Content Writing', 'Social Media Content Creation', 'Blog & Article Writing', 'Digital Marketing Content'],
      },
    ],
  },
  {
    id: 'support',
    number: '06',
    title: 'Support',
    description: 'Maintenance, cloud and technical support.',
    icon: LifeBuoy,
    groups: [
      {
        title: 'Maintenance & Support',
        items: ['Website Maintenance', 'Software Maintenance', 'Application Updates', 'Technical Support', 'Security & Performance Optimization'],
      },
      {
        title: 'Cloud & IT Services',
        items: ['Cloud Solutions', 'Domain & Hosting Services', 'IT Consulting'],
      },
    ],
  },
];

export default services;
