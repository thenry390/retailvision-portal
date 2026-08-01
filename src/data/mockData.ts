export type StoreStatus = "Compliant" | "Attention" | "At Risk";

export interface Store {
  id: string;
  name: string;
  city: string;
  state: string;
  region: string;
  program: string;
  status: StoreStatus;
  completion: number;
  address?: string;
  type?: string;
  complianceScore?: number;
  readiness?: string;
  lastInspection?: string;
  nextMilestone?: string;
  nextMilestoneDate?: string;
  issue?: string;
  contact?: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };
}

export interface Approval {
  id: string;
  asset: string;
  store: string;
  submittedBy: string;
  submittedOn: string;
  priority: "High" | "Normal";
}

export const stores: Store[] = [
  {
    id: "RV-1042",
    name: "Chicago Flagship",
    city: "Chicago",
    state: "IL",
    region: "Midwest",
    program: "2026 Exterior Refresh",
    status: "Attention",
    completion: 72,
    address: "1200 North Michigan Avenue, Chicago, IL 60611",
    type: "Urban Flagship",
    complianceScore: 84,
    readiness: "Conditional",
    lastInspection: "July 18, 2026",
    nextMilestone: "Landlord approval",
    nextMilestoneDate: "August 5, 2026",
    issue: "Electrical site readiness remains incomplete for the east elevation signage package.",
    contact: {
      name: "Maya Chen",
      role: "Regional Program Manager",
      email: "maya.chen@example.com",
      phone: "(312) 555-0184"
    }
  },
  {
    id: "RV-1178",
    name: "Oak Brook",
    city: "Oak Brook",
    state: "IL",
    region: "Midwest",
    program: "Wayfinding Modernization",
    status: "Compliant",
    completion: 100,
    address: "88 Oakbrook Center, Oak Brook, IL 60523",
    type: "Suburban Mall",
    complianceScore: 100,
    readiness: "Ready",
    lastInspection: "July 11, 2026",
    nextMilestone: "Final closeout",
    nextMilestoneDate: "July 31, 2026",
    issue: "No open compliance issues.",
    contact: {
      name: "Eli Warren",
      role: "Field Operations Lead",
      email: "eli.warren@example.com",
      phone: "(630) 555-0108"
    }
  },
  {
    id: "RV-1264",
    name: "Milwaukee Central",
    city: "Milwaukee",
    state: "WI",
    region: "Midwest",
    program: "2026 Exterior Refresh",
    status: "At Risk",
    completion: 41,
    address: "700 West Wisconsin Avenue, Milwaukee, WI 53233",
    type: "Urban Core",
    complianceScore: 68,
    readiness: "Blocked",
    lastInspection: "July 9, 2026",
    nextMilestone: "Permit resubmission",
    nextMilestoneDate: "August 12, 2026",
    issue: "Municipal permit package requires revised mounting calculations.",
    contact: {
      name: "Sam Ortiz",
      role: "Installation Coordinator",
      email: "sam.ortiz@example.com",
      phone: "(414) 555-0167"
    }
  },
  {
    id: "RV-1335",
    name: "Minneapolis North",
    city: "Minneapolis",
    state: "MN",
    region: "Midwest",
    program: "Digital Menu Boards",
    status: "Compliant",
    completion: 93,
    address: "410 Hennepin Avenue, Minneapolis, MN 55401",
    type: "Urban Standard",
    complianceScore: 97,
    readiness: "Ready",
    lastInspection: "July 20, 2026",
    nextMilestone: "Final commissioning",
    nextMilestoneDate: "August 1, 2026",
    issue: "No critical issues.",
    contact: {
      name: "Jordan Blake",
      role: "Program Manager",
      email: "jordan.blake@example.com",
      phone: "(612) 555-0111"
    }
  },
  {
    id: "RV-1411",
    name: "Detroit Midtown",
    city: "Detroit",
    state: "MI",
    region: "Midwest",
    program: "Wayfinding Modernization",
    status: "Attention",
    completion: 64,
    address: "221 Woodward Avenue, Detroit, MI 48226",
    type: "Downtown Standard",
    complianceScore: 81,
    readiness: "Conditional",
    lastInspection: "July 14, 2026",
    nextMilestone: "Asset approval",
    nextMilestoneDate: "August 7, 2026",
    issue: "Directional signage package is awaiting brand review.",
    contact: {
      name: "Taylor Brooks",
      role: "Client Operations Manager",
      email: "taylor.brooks@example.com",
      phone: "(313) 555-0150"
    }
  }
];

export const approvals: Approval[] = [
  {
    id: "AP-2301",
    asset: "Exterior pylon sign — revision B",
    store: "Chicago Flagship",
    submittedBy: "Maya Chen",
    submittedOn: "Jul 25, 2026",
    priority: "High"
  },
  {
    id: "AP-2302",
    asset: "Directional signage package",
    store: "Detroit Midtown",
    submittedBy: "Eli Warren",
    submittedOn: "Jul 24, 2026",
    priority: "Normal"
  },
  {
    id: "AP-2303",
    asset: "Digital menu board layout",
    store: "Minneapolis North",
    submittedBy: "Sam Ortiz",
    submittedOn: "Jul 23, 2026",
    priority: "Normal"
  }
];

export const programData = [
  { name: "Jan", completed: 42, planned: 48 },
  { name: "Feb", completed: 51, planned: 55 },
  { name: "Mar", completed: 63, planned: 64 },
  { name: "Apr", completed: 71, planned: 72 },
  { name: "May", completed: 76, planned: 82 },
  { name: "Jun", completed: 88, planned: 90 },
  { name: "Jul", completed: 93, planned: 96 }
];

export const chicagoAssets = [
  { id: "AS-881", name: "Primary exterior wordmark", type: "Exterior Signage", status: "Approved", revision: "Rev C" },
  { id: "AS-892", name: "East elevation blade sign", type: "Exterior Signage", status: "In Review", revision: "Rev B" },
  { id: "AS-903", name: "Interior directional set", type: "Wayfinding", status: "Approved", revision: "Rev A" },
  { id: "AS-917", name: "Window vinyl campaign kit", type: "Promotional", status: "Draft", revision: "Rev A" }
];

export const chicagoTimeline = [
  { date: "Jul 25", title: "Exterior pylon sign submitted for approval", detail: "Revision B submitted by Maya Chen." },
  { date: "Jul 22", title: "Electrical readiness issue added", detail: "Field team identified incomplete conduit work." },
  { date: "Jul 18", title: "Site inspection completed", detail: "84% compliance score recorded." },
  { date: "Jul 12", title: "Landlord review package sent", detail: "Full exterior signage package delivered." }
];

export type ProgramStatus = "Planning" | "Production" | "Shipping" | "Installing" | "Complete" | "Delayed";

export interface RetailProgram {
  id: string;
  name: string;
  customer: string;
  owner: string;
  status: ProgramStatus;
  dueDate: string;
  storeCount: number;
  completion: number;
  region: string;
}

export const programs: RetailProgram[] = [
  { id: "PG-2601", name: "2026 Exterior Refresh", customer: "Northstar Retail", owner: "Maya Chen", status: "Installing", dueDate: "Aug 18, 2026", storeCount: 245, completion: 74, region: "Midwest" },
  { id: "PG-2602", name: "Wayfinding Modernization", customer: "Apex Market Group", owner: "Eli Warren", status: "Production", dueDate: "Sep 4, 2026", storeCount: 118, completion: 58, region: "Central" },
  { id: "PG-2603", name: "Digital Menu Boards", customer: "Urban Table", owner: "Jordan Blake", status: "Shipping", dueDate: "Aug 9, 2026", storeCount: 86, completion: 81, region: "National" },
  { id: "PG-2604", name: "Holiday Window Graphics", customer: "Brightline Department Stores", owner: "Sarah Johnson", status: "Planning", dueDate: "Oct 15, 2026", storeCount: 312, completion: 22, region: "National" },
  { id: "PG-2605", name: "Pharmacy Brand Conversion", customer: "CareWell Pharmacy", owner: "Sam Ortiz", status: "Delayed", dueDate: "Aug 2, 2026", storeCount: 64, completion: 47, region: "Great Lakes" },
  { id: "PG-2606", name: "Back-to-School Endcaps", customer: "Northstar Retail", owner: "Taylor Brooks", status: "Complete", dueDate: "Jul 25, 2026", storeCount: 198, completion: 100, region: "National" },
  { id: "PG-2607", name: "Drive-Thru Directional Kit", customer: "Urban Table", owner: "Jordan Blake", status: "Production", dueDate: "Sep 12, 2026", storeCount: 73, completion: 39, region: "Southeast" },
  { id: "PG-2608", name: "Storefront LED Retrofit", customer: "Apex Market Group", owner: "Maya Chen", status: "Installing", dueDate: "Aug 30, 2026", storeCount: 92, completion: 67, region: "West" },
  { id: "PG-2609", name: "Seasonal Floor Graphics", customer: "Brightline Department Stores", owner: "Sarah Johnson", status: "Shipping", dueDate: "Sep 1, 2026", storeCount: 154, completion: 76, region: "Northeast" },
  { id: "PG-2610", name: "Compliance Signage Update", customer: "CareWell Pharmacy", owner: "Sam Ortiz", status: "Planning", dueDate: "Nov 7, 2026", storeCount: 221, completion: 14, region: "National" }
];

export const programMilestones = [
  { name: "Artwork approved", status: "Complete", date: "Jun 12, 2026" },
  { name: "Print production", status: "Complete", date: "Jul 3, 2026" },
  { name: "Shipping", status: "Complete", date: "Jul 21, 2026" },
  { name: "Installation", status: "Current", date: "Aug 1–15, 2026" },
  { name: "Customer signoff", status: "Upcoming", date: "Aug 18, 2026" }
];

export const programAssets = [
  { id: "AS-401", name: "Primary storefront wordmark", type: "Exterior Signage", quantity: 245, status: "Delivered" },
  { id: "AS-402", name: "Entry door vinyl set", type: "Window Graphics", quantity: 490, status: "Shipping" },
  { id: "AS-403", name: "Directional blade sign", type: "Wayfinding", quantity: 184, status: "In Production" },
  { id: "AS-404", name: "Installation instruction kit", type: "Field Materials", quantity: 245, status: "Delivered" }
];

export const programActivities = [
  { date: "Jul 29", title: "18 installations completed", detail: "Midwest field teams submitted closeout photos." },
  { date: "Jul 28", title: "Shipment wave 4 released", detail: "Materials released for 41 locations." },
  { date: "Jul 26", title: "Asset revision approved", detail: "Entry door vinyl advanced to production." },
  { date: "Jul 24", title: "Readiness exception added", detail: "Milwaukee permit delay flagged for escalation." }
];

export type RaidType = "Risk" | "Assumption" | "Issue" | "Dependency";
export type RaidSeverity = "Critical" | "High" | "Medium" | "Low";
export type RaidStatus = "Open" | "Mitigating" | "Watching" | "Closed";

export interface RaidItem {
  id: string;
  type: RaidType;
  title: string;
  program: string;
  owner: string;
  severity: RaidSeverity;
  status: RaidStatus;
  dueDate: string;
}

export const executionTrend = [
  { week: "W1", planned: 46, actual: 43 },
  { week: "W2", planned: 53, actual: 49 },
  { week: "W3", planned: 61, actual: 58 },
  { week: "W4", planned: 68, actual: 64 },
  { week: "W5", planned: 75, actual: 71 },
  { week: "W6", planned: 82, actual: 79 },
  { week: "W7", planned: 89, actual: 85 },
  { week: "W8", planned: 96, actual: 91 }
];

export const portfolioHealth = [
  { name: "On track", value: 5 },
  { name: "Needs attention", value: 2 },
  { name: "At risk", value: 1 }
];

export const resourceCapacity = [
  { team: "Creative", allocated: 88, capacity: 100 },
  { team: "Production", allocated: 96, capacity: 100 },
  { team: "Logistics", allocated: 76, capacity: 100 },
  { team: "Field Ops", allocated: 91, capacity: 100 },
  { team: "Approvals", allocated: 68, capacity: 100 }
];

export const raidItems: RaidItem[] = [
  { id: "RAID-041", type: "Issue", title: "Milwaukee permit resubmission may miss fabrication lock", program: "2026 Exterior Refresh", owner: "Sam Ortiz", severity: "Critical", status: "Mitigating", dueDate: "Aug 2" },
  { id: "RAID-044", type: "Risk", title: "Production capacity constrained during August peak", program: "Digital Menu Boards", owner: "Jordan Blake", severity: "High", status: "Watching", dueDate: "Aug 6" },
  { id: "RAID-046", type: "Dependency", title: "Landlord approval required before electrical mobilization", program: "2026 Exterior Refresh", owner: "Maya Chen", severity: "High", status: "Open", dueDate: "Aug 5" },
  { id: "RAID-049", type: "Assumption", title: "Regional installers remain available for week 34", program: "Wayfinding Modernization", owner: "Eli Warren", severity: "Medium", status: "Watching", dueDate: "Aug 9" },
  { id: "RAID-052", type: "Risk", title: "Carrier lead time could compress installation window", program: "Seasonal Window Campaign", owner: "Taylor Brooks", severity: "Medium", status: "Open", dueDate: "Aug 12" }
];

export const executiveMilestones = [
  { date: "Jul 31", label: "Design lock", program: "Seasonal Window Campaign", state: "complete" },
  { date: "Aug 5", label: "Landlord approvals", program: "2026 Exterior Refresh", state: "current" },
  { date: "Aug 9", label: "Production release", program: "Digital Menu Boards", state: "upcoming" },
  { date: "Aug 16", label: "Wave 1 shipping", program: "Wayfinding Modernization", state: "upcoming" },
  { date: "Aug 26", label: "Field installation complete", program: "2026 Exterior Refresh", state: "upcoming" }
];
