import type React from "react";

interface InputProps {
	label?: string;
	type?: "text" | "email" | "password" | "number";
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	required?: boolean;
	disabled?: boolean;
	className?: string;
}

const Input: React.FC<InputProps> = ({
	label,
	type = "text",
	placeholder,
	value,
	onChange,
	error,
	required = false,
	disabled = false,
	className = "",
}) => {
	const baseClasses =
		"block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";
	const errorClasses = error
		? "border-red-300 focus:ring-red-500 focus:border-red-500"
		: "border-gray-300";
	const disabledClasses = disabled ? "bg-gray-50 cursor-not-allowed" : "";

	return (
		<div className="space-y-1">
			{label && (
				<label className="block text-sm font-medium text-gray-700">
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</label>
			)}
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
				disabled={disabled}
				className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`.trim()}
			/>
			{error && <p className="text-sm text-red-600">{error}</p>}
		</div>
	);
};

export default Input;
