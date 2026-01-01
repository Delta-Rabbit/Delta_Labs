"use client"

import React from "react"

type Question = {
  id: number
  type: string
}

type ExerciseCardProps = {
  exerciseName: string
  totalMark: string
  timeGiven: string
  takeWithFriend: boolean
  visibility: string
  questions: Question[]
  createdBy?: { name: string; avatarUrl: string }[]
}

export function ExerciseCard({
  exerciseName,
  totalMark,
  timeGiven,
  takeWithFriend,
  visibility,
  questions,
  createdBy = [
    { name: "Alice", avatarUrl: "https://i.pravatar.cc/40?img=1" },
    { name: "Bob", avatarUrl: "https://i.pravatar.cc/40?img=2" },
  ],
}: ExerciseCardProps) {
  return (
    <div className="max-w-4xl mx-auto my-8 rounded-3xl overflow-hidden shadow-[0_18px_45px_rgba(15,23,42,0.15)] bg-slate-900/95 text-slate-50 flex flex-col lg:flex-row">
      {/* Left Panel – Visual Identity (≈35%) */}
      <div className="lg:w-[35%] bg-gradient-to-br from-rose-100 via-purple-100 to-purple-200 flex items-center justify-center p-6">
        <div className="relative aspect-square w-40 sm:w-48">
          <div className="absolute inset-3 rounded-3xl bg-white/40 backdrop-blur-sm shadow-inner" />
          <img
            src="/newtons-cradle.png"
            alt="Newton's Cradle"
            className="relative z-10 w-full h-full object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* Right Panel – Information Column (≈65%) */}
      <div className="lg:w-[65%] bg-slate-900 px-6 py-7 flex flex-col justify-between">
        {/* WHAT + context */}
        <div className="space-y-5">
          {/* Header row: subject + institution + visibility */}
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-slate-400">
            <span className="font-semibold text-slate-100">
              Kinematics
            </span>

            <span className="h-4 w-px bg-slate-600" />

            <span className="font-medium text-slate-300">
              Addis Ababa UV
            </span>

            <span className="h-4 w-px bg-slate-600" />

            <span className="rounded-full bg-slate-800/70 px-2.5 py-0.5 text-[0.7rem] text-slate-300">
              {visibility}
            </span>
          </div>

          {/* Main title */}
          <h2 className="text-2xl font-semibold text-slate-50">
            {exerciseName}
          </h2>

          {/* HOW – data stack */}
          <div className="flex flex-col gap-3 text-sm text-slate-300">
            {/* Questions */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700">
                <span className="text-xs font-semibold text-slate-200">?</span>
              </div>
              <span className="tracking-wide">
                {questions.length} total questions
              </span>
            </div>

            {/* Time */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700">
                {/* simple line clock icon */}
                <div className="relative h-3.5 w-3.5 rounded-full border border-slate-400">
                  <span className="absolute left-1/2 top-[18%] h-1.5 w-[1px] -translate-x-1/2 bg-slate-400" />
                  <span className="absolute left-[58%] top-1/2 h-[1px] w-1.5 -translate-y-1/2 bg-slate-400" />
                </div>
              </div>
              <span className="tracking-wide">
                {timeGiven ? `${timeGiven} hr long` : "Self‑paced"}
              </span>
            </div>

            {/* Marks */}
            {totalMark && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="h-1 w-1 rounded-full bg-slate-500" />
                <span>{totalMark} marks</span>
              </div>
            )}

            {/* Take with friend */}
            {takeWithFriend && (
              <div className="flex items-center gap-2 text-xs text-emerald-300">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                <span>Take with a friend</span>
              </div>
            )}
          </div>
        </div>

        {/* DO – action + attribution */}
        <div className="mt-7 flex items-end justify-between gap-4">
          {/* Creator credits */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {createdBy.map((user, index) => (
                <img
                  key={user.name}
                  src={user.avatarUrl}
                  alt={user.name}
                  title={user.name}
                  className={`h-9 w-9 rounded-full border-2 border-slate-900 shadow-sm ${
                    index === 1 ? "bg-amber-300" : ""
                  }`}
                />
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-300">
                Created by
              </span>
              <span className="text-xs text-slate-400">
                {createdBy.map(u => u.name).join(", ")}
              </span>
            </div>
          </div>

          {/* CTA */}
          <button className="shrink-0 rounded-full bg-[#1B4D5C] px-7 py-2.5 text-sm font-semibold tracking-[0.08em] text-white shadow-lg shadow-teal-950/35 transition-colors hover:bg-[#16414a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900">
            Go&nbsp;&nbsp;to&nbsp;&nbsp;Test
          </button>
        </div>
      </div>
    </div>
  )
}
