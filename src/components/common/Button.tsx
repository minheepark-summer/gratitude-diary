import type React from "react";

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	variant?: "primary" | "secondary" | "outline";
	size?: "sm" | "md" | "lg";
	disabled?: boolean;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	type = "button",
	variant = "primary",
	size = "md",
	disabled = false,
	className = "",
}) => {
	const baseClasses =
		"font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

	const variantClasses = {
		primary:
			"bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
		secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
		outline:
			"bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
	};

	const sizeClasses = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-sm",
		lg: "px-6 py-3 text-base",
	};

	const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

	const classes =
		`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`.trim();

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={classes}
		>
			{children}
		</button>
	);
};

export default Button;
