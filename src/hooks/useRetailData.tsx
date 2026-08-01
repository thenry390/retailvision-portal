import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { RetailVisionData } from "../models/retailvision";
import { ApprovalService, DashboardService, ExecutionService, ProgramService, StoreService } from "../services/RetailVisionServices";

type State = { data?: RetailVisionData; loading:boolean; error?:string; retry:()=>void };
const Context = createContext<State | undefined>(undefined);
export function RetailDataProvider({children}:{children:ReactNode}){
 const [data,setData]=useState<RetailVisionData>(); const [loading,setLoading]=useState(true); const [error,setError]=useState<string>(); const [version,setVersion]=useState(0);
 const retry=useCallback(()=>setVersion(v=>v+1),[]);
 useEffect(()=>{ let active=true; setLoading(true); setError(undefined); Promise.all([DashboardService.get(),StoreService.getAll(),ProgramService.getAll(),ApprovalService.getAll(),ExecutionService.get()]).then(([dashboard,stores,programs,approvals,execution])=>{if(active)setData({dashboard,stores,programs,approvals,execution});}).catch((e:unknown)=>{if(active)setError(e instanceof Error?e.message:"Unable to load RetailVision data.");}).finally(()=>{if(active)setLoading(false);}); return()=>{active=false};},[version]);
 return <Context.Provider value={{data,loading,error,retry}}>{children}</Context.Provider>;
}
export function useRetailData(){ const value=useContext(Context); if(!value) throw new Error("useRetailData must be used inside RetailDataProvider"); return value; }
