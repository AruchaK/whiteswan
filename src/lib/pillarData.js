/*
 * Mock planning data for each pillar page (/dashboard/planning/{pillar}).
 * Keyed by pillar key. Transcribed from the pillar mockups; Legal contacts
 * and notes match the reference screens verbatim, the other pillars use
 * consistent placeholder data in the same Thai family context.
 */

export const PILLAR_DATA = {
  legal: {
    subtitle: 'Will, Power of Attorney, Trusts',
    badges: [
      { type: 'warning', label: '1 critical item missing' },
      { type: 'secure', label: 'Encrypted' },
      { type: 'recency', label: 'Last Will · 12 days ago' },
    ],
    cta: 'Continue planning',
    checklistTitle: 'Legal action items',
    tasks: [
      { id: 'legal-t1', title: 'Sign Power of Attorney', due: 'Jun 12', duration: '~30 min', priority: 'HIGH', vault: true },
      { id: 'legal-t2', title: 'Review will with solicitor', due: 'Jun 25', duration: '~1 hr', priority: 'MED' },
      { id: 'legal-t3', title: 'Add backup executor contact', due: 'Jul 01', duration: '~5 min', priority: 'LOW' },
    ],
    completed: [
      { id: 'legal-c1', title: 'Initial setup & review', when: 'Completed last month' },
      { id: 'legal-c2', title: 'Upload Last Will & Testament', when: 'Completed 12 days ago' },
      { id: 'legal-c3', title: 'Upload Power of Attorney', when: 'Completed 3 weeks ago' },
      { id: 'legal-c4', title: 'Upload Family Trust Agreement', when: 'Completed 2 months ago' },
    ],
    contactsTitle: 'Legal circle',
    contacts: [
      { id: 'legal-p1', name: 'Khun Anand Vongchai', role: 'Family lawyer', org: 'Vongchai & Partners', phone: true, email: true },
      { id: 'legal-p2', name: 'Khun Suthida Lim', role: 'Estate solicitor', org: 'Lim Legal Group', phone: true, email: true },
      { id: 'legal-p3', name: 'Khun Pim Siriwong', role: 'Primary executor (spouse)', org: '', phone: true, email: false },
    ],
    notesTitle: 'In your own words',
    notes: {
      will: [
        {
          id: 'legal-n1',
          title: 'Last Will & Testament',
          body: 'I leave my Bangkok residence to my spouse Pim, with usufruct passing to Nara on her passing. Family Trust governs investment assets…',
          updated: 'Updated 12 days ago',
        },
      ],
      personal: [
        {
          id: 'legal-n2',
          title: 'Letter of wishes',
          body: 'Personal guidance for the executors on how to distribute heirlooms, family photographs, and the items at the Chiang Mai house.',
          updated: 'Updated 3 weeks ago',
        },
        {
          id: 'legal-n3',
          title: 'Digital asset list',
          body: 'Password manager master location, cloud storage accounts, and instructions for transferring the family blog.',
          updated: 'Updated 1 month ago',
        },
      ],
    },
  },

  medical: {
    subtitle: 'Directives, GP, Insurance, allergies',
    badges: [
      { type: 'warning', label: '2 critical items missing' },
      { type: 'secure', label: 'Encrypted' },
      { type: 'recency', label: 'Last directive · 3 months ago' },
    ],
    cta: 'Continue planning',
    checklistTitle: 'Medical action items',
    tasks: [
      { id: 'medical-t1', title: 'Sign healthcare directive', due: 'Jun 15', duration: '~20 min', priority: 'HIGH', vault: true },
      { id: 'medical-t2', title: 'Update GP contact details', due: 'Jun 22', duration: '~15 min', priority: 'MED' },
      { id: 'medical-t3', title: 'Add specialist contact', due: 'Jul 05', duration: '~10 min', priority: 'LOW' },
    ],
    completed: [
      { id: 'medical-c1', title: 'Initial setup & review', when: 'Completed last month' },
      { id: 'medical-c2', title: 'Upload Healthcare Directive Draft', when: 'Completed 1 week ago' },
      { id: 'medical-c3', title: 'Upload Insurance Policy - AIA', when: 'Completed 1 month ago' },
      { id: 'medical-c4', title: 'Upload Vaccination Record', when: 'Completed 4 months ago' },
    ],
    contactsTitle: 'Medical circle',
    contacts: [
      { id: 'medical-p1', name: 'Dr. Preecha Chan', role: 'GP / Primary doctor', org: 'Bumrungrad Hospital', phone: true, email: true },
      { id: 'medical-p2', name: 'Dr. Nalin Ratana', role: 'Cardiologist', org: 'Bangkok Heart Clinic', phone: true, email: true },
      { id: 'medical-p3', name: 'Khun Pim Siriwong', role: 'Medical proxy (spouse)', org: '', phone: true, email: false },
    ],
    notesTitle: 'In your own words',
    notes: {
      will: [
        {
          id: 'medical-n1',
          title: 'Advance healthcare directive',
          body: 'I decline prolonged life support in the absence of a reasonable prospect of recovery. Pim holds authority for medical decisions…',
          updated: 'Updated 3 months ago',
        },
      ],
      personal: [
        {
          id: 'medical-n2',
          title: 'Allergies & conditions',
          body: 'Penicillin allergy, mild asthma. Current medication list and preferred pharmacy details for the family to reference.',
          updated: 'Updated 1 month ago',
        },
        {
          id: 'medical-n3',
          title: 'Care preferences',
          body: 'Preferred hospital is Bumrungrad. Notes on comfort, faith practices, and who should be contacted first in an emergency.',
          updated: 'Updated 2 months ago',
        },
      ],
    },
  },

  financial: {
    subtitle: 'Bank, Investments, Insurance, Pension',
    badges: [
      { type: 'warning', label: '1 review overdue' },
      { type: 'secure', label: 'Encrypted' },
      { type: 'recency', label: 'Last sync · 2 days ago' },
    ],
    cta: 'Continue planning',
    checklistTitle: 'Financial action items',
    tasks: [
      { id: 'financial-t1', title: 'Review pension beneficiary', due: 'Jun 18', duration: '~15 min', priority: 'HIGH' },
      { id: 'financial-t2', title: 'Rebalance investment portfolio', due: 'Jul 02', duration: '~45 min', priority: 'MED' },
      { id: 'financial-t3', title: 'Update insurance policy', due: 'Jul 10', duration: '~20 min', priority: 'LOW' },
    ],
    completed: [
      { id: 'financial-c1', title: 'Initial setup & review', when: 'Completed last month' },
      { id: 'financial-c2', title: 'Upload Bank Statement - SCB', when: 'Completed 2 days ago' },
      { id: 'financial-c3', title: 'Upload Investment Portfolio - CGS', when: 'Completed 1 week ago' },
      { id: 'financial-c4', title: 'Upload Property Deed - Bangkok', when: 'Completed 6 months ago' },
    ],
    contactsTitle: 'Financial circle',
    contacts: [
      { id: 'financial-p1', name: 'Khun Wirat Somsak', role: 'Financial advisor', org: 'CGS Wealth', phone: true, email: true },
      { id: 'financial-p2', name: 'Khun Malee Thong', role: 'Accountant', org: 'Thong & Co.', phone: true, email: true },
      { id: 'financial-p3', name: 'Khun Pim Siriwong', role: 'Joint account holder (spouse)', org: '', phone: true, email: false },
    ],
    notesTitle: 'In your own words',
    notes: {
      will: [
        {
          id: 'financial-n1',
          title: 'Asset distribution notes',
          body: 'Investment assets are governed by the Family Trust. Pension beneficiary is Pim, with the children as contingent beneficiaries…',
          updated: 'Updated 2 days ago',
        },
      ],
      personal: [
        {
          id: 'financial-n2',
          title: 'Accounts & institutions',
          body: 'Primary bank is SCB, investments held at CGS, insurance with AIA. Locations of statements and how to reach each institution.',
          updated: 'Updated 1 week ago',
        },
        {
          id: 'financial-n3',
          title: 'Recurring obligations',
          body: 'Monthly bills, property tax schedule, and standing transfers that should continue for the family after I am gone.',
          updated: 'Updated 1 month ago',
        },
      ],
    },
  },

  personal: {
    subtitle: 'Letters, Funeral, Values, Digital legacy',
    badges: [
      { type: 'warning', label: '4 reflections pending' },
      { type: 'secure', label: 'Encrypted' },
      { type: 'recency', label: 'Last reflection · 4 months ago' },
    ],
    cta: 'Start guided reflection',
    checklistTitle: 'Personal action items',
    tasks: [
      { id: 'personal-t1', title: 'Write a letter to Nara', due: 'Jun 20', duration: '~30 min', priority: 'HIGH' },
      { id: 'personal-t2', title: 'Record voice memory', due: 'Jun 30', duration: '~15 min', priority: 'MED' },
      { id: 'personal-t3', title: 'Add favourite recipes', due: 'Jul 15', duration: '~10 min', priority: 'LOW' },
    ],
    completed: [
      { id: 'personal-c1', title: 'Initial setup & review', when: 'Completed last month' },
      { id: 'personal-c2', title: 'Upload Letter to Pim Siriwong', when: 'Completed 2 days ago' },
      { id: 'personal-c3', title: 'Upload Funeral preferences', when: 'Completed 4 months ago' },
      { id: 'personal-c4', title: 'Upload Values & beliefs notes', when: 'Completed · Awaiting reflection' },
    ],
    contactsTitle: 'Personal circle',
    contacts: [
      { id: 'personal-p1', name: 'Khun Pim Siriwong', role: 'Spouse', org: '', phone: true, email: false },
      { id: 'personal-p2', name: 'Nara Jaidee', role: 'Daughter', org: '', phone: true, email: true },
      { id: 'personal-p3', name: 'Phra Ajahn Somdet', role: 'Spiritual advisor', org: 'Wat Pho', phone: true, email: false },
    ],
    notesTitle: 'In your own words',
    notes: {
      will: [
        {
          id: 'personal-n1',
          title: 'Funeral & farewell wishes',
          body: 'A quiet Buddhist ceremony at Wat Pho, cremation, and ashes returned to the family home in Chiang Mai…',
          updated: 'Updated 4 months ago',
        },
      ],
      personal: [
        {
          id: 'personal-n2',
          title: 'Letter to my children',
          body: 'What I hope for Nara and Ploy — the values I want them to carry, and the stories behind the things I am leaving them.',
          updated: 'Updated 2 days ago',
        },
        {
          id: 'personal-n3',
          title: 'Digital legacy',
          body: 'Instructions for my photo archive, social accounts, and the family blog I would like Nara to keep going.',
          updated: 'Updated 5 months ago',
        },
      ],
    },
  },

  family: {
    subtitle: 'Contacts, Family network, Roles',
    badges: [
      { type: 'warning', label: 'Key contacts list incomplete' },
      { type: 'secure', label: 'Encrypted' },
      { type: 'recency', label: 'Last update · 1 month ago' },
    ],
    cta: 'Continue planning',
    checklistTitle: 'Family action items',
    tasks: [
      { id: 'family-t1', title: 'Add backup family contact', due: 'Jun 14', duration: '~10 min', priority: 'HIGH' },
      { id: 'family-t2', title: 'Confirm trusted deputies', due: 'Jun 28', duration: '~20 min', priority: 'MED' },
      { id: 'family-t3', title: 'Update neighbour contacts', due: 'Jul 12', duration: '~5 min', priority: 'LOW' },
    ],
    completed: [
      { id: 'family-c1', title: 'Initial setup & review', when: 'Completed last month' },
      { id: 'family-c2', title: 'Upload Family contact list', when: 'Completed 1 month ago' },
      { id: 'family-c3', title: 'Upload Trustee assignment', when: 'Completed 5 days ago' },
      { id: 'family-c4', title: 'Upload Community register', when: 'Completed 3 months ago' },
    ],
    contactsTitle: 'Family circle',
    contacts: [
      { id: 'family-p1', name: 'Pisan Jaidee', role: 'Father · Trustee', org: 'Bangkok', phone: true, email: true },
      { id: 'family-p2', name: 'Somsri Jaidee', role: 'Mother · Editor', org: 'Chiang Mai', phone: true, email: true },
      { id: 'family-p3', name: 'Khun Pim Siriwong', role: 'Spouse · Trustee', org: '', phone: true, email: false },
    ],
    notesTitle: 'In your own words',
    notes: {
      will: [
        {
          id: 'family-n1',
          title: 'Roles & responsibilities',
          body: 'Pim and my father Pisan act as trustees. My mother Somsri may edit records. Notes on who decides what if I am unavailable…',
          updated: 'Updated 1 month ago',
        },
      ],
      personal: [
        {
          id: 'family-n2',
          title: 'Emergency plan',
          body: 'Who to call first, where the children should go, and the neighbour and community contacts that can help in a crisis.',
          updated: 'Updated 3 weeks ago',
        },
        {
          id: 'family-n3',
          title: 'Family traditions',
          body: 'The Songkran gathering in Chiang Mai, the recipes, and the customs I hope the family keeps for the next generation.',
          updated: 'Updated 2 months ago',
        },
      ],
    },
  },
}
