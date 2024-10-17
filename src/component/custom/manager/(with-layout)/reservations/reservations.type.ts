import type { Tstatus } from "@/util/api/get-main-page-data"

export type TStatusExcludeCanceled = Exclude<Tstatus, "CANCELED">
