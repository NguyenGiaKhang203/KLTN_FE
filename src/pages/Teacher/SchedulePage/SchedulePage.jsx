import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { DatePicker, Button, Tooltip } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import * as ScheduleService from "../../../services/ScheduleService";

import {
  ScheduleContainer,
  HeaderSection,
  ScheduleTable,
  TimeCell,
  ClassCell,
  ClassCard,
} from "./style";

const getWeekDays = (startDate = new Date()) => {
  const result = [];
  const day = startDate.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const start = new Date(startDate);
  start.setDate(start.getDate() + mondayOffset);

  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const label = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"][i];
    const date = d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
    result.push({ label, date, fullDate: d });
  }

  return result;
};

const timeSlots = [
  { id: "ca1", label: "07H00 - 09H00", time: "07:00", session: "Buổi sáng" },
  { id: "ca2", label: "09H00 - 11H00", time: "09:00", session: "Buổi sáng" },
  { id: "ca3", label: "15H00 - 17H00", time: "15:00", session: "Buổi chiều" },
  { id: "ca4", label: "19H00 - 21H00", time: "19:00", session: "Buổi tối" },
];

const SchedulePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState({});
  const user = useSelector((state) => state.user);
  const studentId = user?.user?._id;
  const token = user?.access_token;

  const days = useMemo(() => getWeekDays(currentDate), [currentDate]);

  const handleDateChange = (date) => {
    if (date) setCurrentDate(date.toDate());
  };

  const handleToday = () => setCurrentDate(new Date());
  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const formatSchedule = (data, days) => {
    const result = {};
    data.forEach((classItem) => {
      const classStartDate = dayjs(classItem.startDate);
      const classEndDate = dayjs(classItem.endDate);
      if (!classStartDate.isValid() || !classEndDate.isValid()) return;

      days.forEach((day) => {
        const currentDay = dayjs(day.fullDate);
        if (currentDay.isBefore(classStartDate, "day") || currentDay.isAfter(classEndDate, "day"))
          return;

        classItem.schedule.forEach((sch) => {
          const matchedDay = sch.day.replace("Thứ ", "T");
          if (day.label !== matchedDay) return;

          const dateKey = day.date;
          if (!result[dateKey]) result[dateKey] = {};

          let slotId = "";
          switch (sch.startTime) {
            case "07:00": slotId = "ca1"; break;
            case "09:00": slotId = "ca2"; break;
            case "15:00": slotId = "ca3"; break;
            case "18:00":
            case "19:00": slotId = "ca4"; break;
          }

          if (slotId) {
            result[dateKey][slotId] = {
              name: classItem.name,
              level: classItem.course?.name || "Không rõ",
              teacher: "Bạn",
              room: classItem.address,
              program: classItem.program || null,
            };
          }
        });
      });
    });

    return result;
  };

  const fetchSchedule = async () => {
    try {
      const res = await ScheduleService.getTeacherSchedule(studentId, token);
      const formatted = formatSchedule(res?.data || [], days);
      setScheduleData(formatted);
    } catch (error) {
      console.error("❌ Lỗi lấy lịch học học viên:", error);
    }
  };

  useEffect(() => {
    if (studentId && token) fetchSchedule();
  }, [studentId, token, currentDate]);

  return (
    <ScheduleContainer>
      <HeaderSection>
        <div className="left">
          <Button className="arrow-btn" icon={<LeftOutlined />} onClick={handlePrevWeek} />
          <Button className="arrow-btn" icon={<RightOutlined />} onClick={handleNextWeek} />
          <Button className="today-btn" onClick={handleToday}>Hôm nay</Button>
          <DatePicker
            allowClear={false}
            value={dayjs(currentDate)}
            onChange={handleDateChange}
            format="DD/MM/YYYY"
            locale="vi"
          />
          <div className="date-range">
            {days[0].fullDate.toLocaleDateString("vi-VN")} - {days[6].fullDate.toLocaleDateString("vi-VN")}
          </div>
        </div>
        <div className="right">
          <Button className="tab active">Tuần</Button>
        </div>
      </HeaderSection>

      <ScheduleTable>
        <thead>
          <tr>
            <th>Ca dạy</th>
            {days.map((day) => (
              <th key={day.date}>{day.label}, {day.date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot) => (
            <tr key={slot.id}>
              <TimeCell>
                {slot.label}
                <br />
                <small>{slot.time}</small>
                <div className="session">{slot.session}</div>
              </TimeCell>
              {days.map((day) => {
                const cell = scheduleData?.[day.date]?.[slot.id];
                return (
                  <ClassCell key={`${day.date}-${slot.id}`}>
                    {cell && (
                      <Tooltip
                        title={
                          <>
                            <div><strong>{cell.name}</strong></div>
                            <div>🎯 {cell.level}</div>
                            <div>👤 {cell.teacher}</div>
                            <div>🏫 {cell.room}</div>
                          </>
                        }
                        placement="top"
                      >
                        <ClassCard>
                          <div className="class-name">{cell.name}</div>
                          <div className="level">🎯 {cell.level}</div>
                          <div className="teacher">👤 {cell.teacher}</div>
                          <div className="room">🏫 {cell.room}</div>
                        </ClassCard>
                      </Tooltip>
                    )}
                  </ClassCell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </ScheduleTable>
    </ScheduleContainer>
  );
};

export default SchedulePage;
