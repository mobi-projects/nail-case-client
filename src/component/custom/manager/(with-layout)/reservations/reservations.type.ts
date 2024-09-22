import type { Tstatus } from "@/util/api-v2/get-main-page-data"

export type TStatusExcludeCanceled = Exclude<Tstatus, "CANCELED">
