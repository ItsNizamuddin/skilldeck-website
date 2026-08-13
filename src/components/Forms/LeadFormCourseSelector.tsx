'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { SearchableSelect } from './SearchableSelect';

interface LeadFormCourseSelectorProps {
    value?: string;
    onChange: (slug: string, title?: string) => void;
    defaultSlug?: string;
    placeholder?: string;
}

interface CourseOption {
    slug: string;
    course_title: string;
    course_name: string;
}

export default function LeadFormCourseSelector({ value, onChange, defaultSlug, placeholder }: LeadFormCourseSelectorProps) {
    const [availableCourses, setAvailableCourses] = useState<CourseOption[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCoursesLoading, setIsCoursesLoading] = useState(false);
    const [coursesLoaded, setCoursesLoaded] = useState(false);
    const isFetchingRef = useRef(false);
    const hasLoadedRef = useRef(false);

    const handleLoadCourses = useCallback(async () => {
        if (hasLoadedRef.current || isFetchingRef.current) return;

        isFetchingRef.current = true;
        setIsCoursesLoading(true);

        try {
            const res = await fetch(`/api/courses?select=course_title,course_name,slug`);
            if (res.ok) {
                const data = await res.json() as { data?: CourseOption[] } | CourseOption[];
                const courseData = Array.isArray(data) ? data : (data.data || []);
                setAvailableCourses(courseData);
                setCoursesLoaded(true);
                hasLoadedRef.current = true;
            }
        } catch (error) {
            console.error('Failed to load courses', error);
        } finally {
            setIsCoursesLoading(false);
            isFetchingRef.current = false;
        }
    }, []);

    // Load courses on mount
    useEffect(() => {
        void handleLoadCourses();
    }, [handleLoadCourses]);

    // Auto-select default slug if not already selected or if title is missing
    useEffect(() => {
        if (defaultSlug && availableCourses.length > 0) {
            if (!value || value === defaultSlug) {
                const defaultCourse = availableCourses.find(c => c.slug === defaultSlug);
                if (defaultCourse) {
                    onChange(defaultSlug, defaultCourse.course_title);
                } else if (defaultSlug === 'need-guidance') {
                    onChange(defaultSlug, 'Not Sure – Need Guidance');
                } else {
                    onChange('', '');
                }
            }
        } else if (!value && defaultSlug) {
            const formattedTitle = defaultSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            onChange(defaultSlug, formattedTitle);
        }
    }, [defaultSlug, value, onChange, availableCourses]);

    // Filter courses based on query client-side
    const filteredCourses = availableCourses.filter(c => 
        c.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.course_title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Create base options conforming to SearchableSelect Option interface ({ id, name })
    const options: Array<{ id: string; name: string }> = [
        { name: placeholder || "Select an option", id: "" },
        ...filteredCourses.map(c => ({
            name: c.course_name,
            id: c.slug
        }))
    ];

    // Add assistance option at the end
    options.push({
        name: "Not Sure – Need Guidance",
        id: "need-guidance"
    });

    // If we have a value (e.g. defaultSlug) but courses aren't loaded or filtered out,
    // we want to make sure it's present in the list so SearchableSelect can show its label.
    if (value && !options.some(o => o.id === value)) {
        options.unshift({
            name: defaultSlug === value ? (defaultSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())) : value,
            id: value
        });
    }

    const handleChange = (val: string | number) => {
        const strVal = val.toString();
        const selected = options.find(o => o.id === strVal);
        onChange(strVal, selected?.name);
    };

    return (
        <div className="relative">
            <SearchableSelect
                value={value || ""}
                onChange={handleChange}
                options={options}
                onSearch={(query) => setSearchQuery(query)}
                loading={isCoursesLoading}
                label="Course Selection"
                placeholder={placeholder || (isCoursesLoading ? "Loading Courses..." : "Select Course...")}
            />
        </div>
    );
}
