"use client"

import Image from "next/image"
import React, { useState } from "react"

import { NTButton } from "../common/atom/nt-button"
import NTIcon from "../common/nt-icon"

export const FileUploader: React.FC = () => {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([])

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const newFiles = Array.from(event.target.files)
			setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles].slice(0, 5))
		}
	}

	const handleRemoveFile = (index: number) => {
		const newFiles = [...selectedFiles]
		newFiles.splice(index, 1)
		setSelectedFiles(newFiles)
	}

	const handleClearFiles = () => {
		setSelectedFiles([])
	}

	return (
		<div className="flex h-[120px] w-[690px] items-center rounded-[16px] border border-dashed border-Gray30 p-4">
			<input
				type="file"
				multiple
				accept="image/jpeg,image/png"
				className="hidden"
				id="file-upload"
				onChange={handleFileChange}
			/>
			{selectedFiles.length === 0 ? (
				<div className="flex h-[120px] items-center">
					<div className="h-[90px] w-[90px] rounded-[7px] border-[0.5px] border-Gray30 bg-Gray10"></div>
					<div className="ml-[20px] mt-[10px]">
						<label
							htmlFor="file-upload"
							className="h-[34px] w-[109px] cursor-pointer rounded-[6px] border-[0.5px] border-Gray30 bg-Gray10 px-[28px] py-[7px] text-center text-Gray70"
						>
							파일 선택
						</label>
						<p className="mt-[15px] text-Callout text-Gray70">
							시술 받고 싶은 네일 디자인을 등록해주세요.
						</p>
						<p className="text-Caption01 text-Gray50">최대 5장 · JPG, PNG</p>
					</div>
				</div>
			) : (
				<div className="flex w-full items-center justify-between">
					<div className="flex space-x-5">
						{selectedFiles.map((file, idx) => (
							<div
								key={idx}
								className="group relative h-[90px] w-[90px] rounded-[7px]"
							>
								<Image
									src={URL.createObjectURL(file)}
									alt={`thumbnail-${idx}`}
									layout="fill"
									objectFit="cover"
									className="rounded-[7px] border-[0.5px] border-Gray30"
								/>
								<div
									onClick={() => handleRemoveFile(idx)}
									className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-[7px] bg-black bg-opacity-50 text-lg text-white opacity-0 group-hover:opacity-100"
								>
									<NTIcon icon="closeRoundLight" />
								</div>
							</div>
						))}
						{selectedFiles.length < 5 && (
							<label
								htmlFor="file-upload"
								className="flex h-[90px] w-[90px] cursor-pointer items-center justify-center rounded-[7px] border-Gray30 bg-Gray10 text-Gray70"
							>
								+
							</label>
						)}
					</div>
					<div className="ml-[20px]">
						<NTButton
							variant="tertiary"
							size="small"
							onClick={handleClearFiles}
						>
							재등록하기
						</NTButton>
					</div>
				</div>
			)}
		</div>
	)
}
