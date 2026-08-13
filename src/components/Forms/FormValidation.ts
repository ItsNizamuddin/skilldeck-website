interface FormData {
    firstname?: string;
    email?: string;
    phone?: string;
    company?: string;
    message?: string;
    requirements?: string[];
    [key: string]: any;
}

export const formValidation = (data: FormData): string | null => {
    if (!data.firstname?.trim()) {
        return "Name is required";
    }

    if (!data.email?.trim()) {
        return "Email is required";
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return "Please enter a valid email address";
    }

    if (!data.phone?.trim()) {
        return "Phone number is required";
    }

    if (data.phone.length < 10) {
        return "Please enter a valid phone number";
    }

    return null;
};
