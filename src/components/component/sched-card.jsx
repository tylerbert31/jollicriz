"use client";

import { Toggle } from "@/components/ui/toggle";
import { CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { useState, useEffect, useRef } from "react";

export function SchedCard({ day, sched }) {
  const [shiftType, setShiftType] = useState(sched.day_shift);
  const [availability, setAvailable] = useState(sched.available);
  const [classStart, setClassStart] = useState(sched.class_start);
  const [classEnd, setClassEnd] = useState(sched.class_end);
  const [shiftStart, setShiftStart] = useState(sched.shift_start);
  const [shiftEnd, setShiftEnd] = useState(sched.shift_end);
  const isMounted = useRef(false);

  useEffect(() => {
    const data = {
      day_shift: shiftType,
      available: availability,
      class_start: classStart,
      class_end: classEnd,
      shift_start: shiftStart,
      shift_end: shiftEnd,
      id: sched.id,
    };
    if (isMounted.current) {
      fetch("/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      isMounted.current = true;
    }
  }, [shiftType, availability, classStart, classEnd, shiftStart, shiftEnd]);
  return (
    <>
      <CardHeader className="flex justify-between items-center">
        <span className="text-lg font-medium">{day}</span>
        <div className="grid gap-1 w-full">
          <Toggle
            onClick={() => setShiftType(!shiftType)}
            className={shiftType ? "bg-yellow-600" : "bg-sky-700"}
          >
            {shiftType ? <SunIcon className="h-4 w-4" /> : <MoonIcon />}
            <span className="ml-1">
              {shiftType ? "Day Shift" : "Night Shift"}
            </span>
          </Toggle>
          <Toggle
            onClick={() => setAvailable(!availability)}
            className={availability ? "bg-green-600" : "bg-red-600"}
          >
            {availability ? <CheckIcon className="h-4 w-4" /> : <XIcon />}
            <span>{availability ? "Available" : "Not Available"}</span>
          </Toggle>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="class-start">Class Start</Label>
            <Select
              defaultValue={classStart}
              id="class-start"
              onValueChange={(e) => setClassStart(e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <TimeOptions />
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="class-end">Class End</Label>
            <Select
              defaultValue={classEnd}
              id="class-end"
              onValueChange={(e) => setClassEnd(e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <TimeOptions />
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="shift-start">Shift Start</Label>
            <Select
              defaultValue={shiftStart}
              id="shift-start"
              onValueChange={(e) => setShiftStart(e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <TimeOptions />
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="shift-end">Shift End</Label>
            <Select
              defaultValue={shiftEnd}
              id="shift-end"
              onValueChange={(e) => setShiftEnd(e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <TimeOptions />
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </>
  );
}

function SunIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
        />
      </svg>
    </>
  );
}

function TimeOptions() {
  const time = [
    "None",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
    "12:00 AM",
  ];

  return (
    <>
      {time.map((item, index) => {
        return (
          <SelectItem key={index} value={item}>
            {item}
          </SelectItem>
        );
      })}
    </>
  );
}

function compare(oldSched, newSched) {
  if (oldSched.day_shift != newSched.day_shift) {
    return true;
  }
  if (oldSched.available != newSched.available) {
    return true;
  }
  if (oldSched.class_start != newSched.class_start) {
    return true;
  }
  if (oldSched.class_end != newSched.class_end) {
    return true;
  }
  if (oldSched.shift_start != newSched.shift_start) {
    return true;
  }
  if (oldSched.shift_end != newSched.shift_end) {
    return true;
  }
  return false;
}
