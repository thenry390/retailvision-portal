export type StoreStatus = "Compliant" | "Attention" | "At Risk";
export interface StoreContact { name: string; role: string; email: string; phone: string; }
export interface StoreRecord { id: string; name: string; type?: string; address?: string; city: string; state: string; region: string; program: string; status: StoreStatus; completion: number; complianceScore?: number; readiness?: string; lastInspection?: string; nextMilestone?: string; nextMilestoneDate?: string; issue?: string; contact?: StoreContact; }
export interface ApprovalRecord { id: string; asset: string; store: string; submittedBy: string; submittedOn: string; priority: string; }
export type ProgramStatus = "Planning" | "Production" | "Shipping" | "Installing" | "Complete" | "Delayed";
export interface ProgramRecord { id: string; name: string; customer: string; owner: string; status: ProgramStatus; dueDate: string; storeCount: number; completion: number; region: string; }
export type RaidType = "Risk" | "Assumption" | "Issue" | "Dependency";
export type RaidSeverity = "Critical" | "High" | "Medium" | "Low";
export type RaidStatus = "Open" | "Mitigating" | "Watching" | "Closed";
export interface RaidItem { id: string; title: string; type: RaidType; owner: string; severity: RaidSeverity; status: RaidStatus; dueDate: string; program: string; }
export interface DashboardResponse { approvals: ApprovalRecord[]; programData: Array<{name:string; completed:number; planned:number}>; }
export interface StoreResponse { stores: StoreRecord[]; assets: Array<{id:string;name:string;type:string;status:string;revision:string}>; timeline: Array<{date:string;title:string;detail:string}>; }
export interface ProgramResponse { programs: ProgramRecord[]; milestones: Array<{name:string;status:string;date:string}>; assets: Array<{id:string;name:string;type:string;quantity:number;status:string}>; activities: Array<{date:string;title:string;detail:string}>; }
export interface ExecutionResponse { executionTrend:Array<{week:string;planned:number;actual:number}>; portfolioHealth:Array<{name:string;value:number}>; resourceCapacity:Array<{team:string;allocated:number}>; raidItems:RaidItem[]; executiveMilestones:Array<{date:string;label:string;program:string;state:string}>; }
export interface RetailVisionData { dashboard: DashboardResponse; stores: StoreResponse; programs: ProgramResponse; approvals: ApprovalRecord[]; execution: ExecutionResponse; }
