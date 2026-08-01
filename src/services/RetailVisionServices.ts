import { apiGet } from "../api/apiClient";
import type { ApprovalRecord, DashboardResponse, ExecutionResponse, ProgramResponse, StoreResponse } from "../models/retailvision";
export const DashboardService = { get: () => apiGet<DashboardResponse>("/api/dashboard") };
export const StoreService = { getAll: () => apiGet<StoreResponse>("/api/stores") };
export const ProgramService = { getAll: () => apiGet<ProgramResponse>("/api/programs") };
export const ApprovalService = { getAll: () => apiGet<ApprovalRecord[]>("/api/approvals") };
export const ExecutionService = { get: () => apiGet<ExecutionResponse>("/api/execution") };
