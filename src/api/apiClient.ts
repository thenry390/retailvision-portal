import * as mock from "../data/mockData";
import type { DashboardResponse, ExecutionResponse, ProgramResponse, StoreResponse } from "../models/retailvision";

export class ApiError extends Error { constructor(message:string, public status=500){ super(message); } }
const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function apiGet<T>(endpoint:string):Promise<T> {
  await delay(250);
  const forceError = new URLSearchParams(window.location.search).get("apiError") === "1";
  if (forceError) throw new ApiError("The RetailVision API is temporarily unavailable.", 503);
  const routes:Record<string, unknown> = {
    "/api/dashboard": { approvals: mock.approvals, programData: mock.programData } satisfies DashboardResponse,
    "/api/stores": { stores: mock.stores, assets: mock.chicagoAssets, timeline: mock.chicagoTimeline } satisfies StoreResponse,
    "/api/programs": { programs: mock.programs, milestones: mock.programMilestones, assets: mock.programAssets, activities: mock.programActivities } satisfies ProgramResponse,
    "/api/approvals": mock.approvals,
    "/api/execution": { executionTrend: mock.executionTrend, portfolioHealth: mock.portfolioHealth, resourceCapacity: mock.resourceCapacity, raidItems: mock.raidItems, executiveMilestones: mock.executiveMilestones } satisfies ExecutionResponse
  };
  if (!(endpoint in routes)) throw new ApiError(`Endpoint not found: ${endpoint}`, 404);
  return structuredClone(routes[endpoint]) as T;
}
