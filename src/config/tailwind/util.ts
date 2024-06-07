import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"
const customTwMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			"font-size": [
				"text-LargeTitle",
				"text-Title01",
				"text-Title02",
				"text-Title03",
				"text-Headline01",
				"text-Headline02",
				"text-Button",
				"text-Body01",
				"text-Body02",
				"text-Callout",
				"text-Caption01",
				"text-Caption02",
			],
			animate: ["animate-in", "animate-out", "animate-none"],
		},
	},
})
export function cn(...args: ClassValue[]) {
	return customTwMerge(clsx(...args))
}
