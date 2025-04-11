import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { DatePicker, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import * as ScheduleService from "../../services/ScheduleService";
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

const StudentSchedulePage = () => {
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

  const formatSchedule = (data) => {
    const result = {};
    data.forEach((classItem) => {
      classItem.schedule.forEach((sch) => {
        const matchedDay = days.find(
          (d) => d.label === sch.day.replace("Thứ ", "T")
        );
        if (matchedDay) {
          const dateKey = matchedDay.date;
          if (!result[dateKey]) result[dateKey] = {};

          let slotId = "";
          if (sch.startTime === "07:00") slotId = "ca1";
          else if (sch.startTime === "09:00") slotId = "ca2";
          else if (sch.startTime === "15:00") slotId = "ca3";
          else if (sch.startTime === "18:00" || sch.startTime === "19:00")
            slotId = "ca4";

          if (slotId) {
            result[dateKey][slotId] = {
              name: classItem.name,
              level: classItem.course?.name,
              teacher: classItem.teacher?.name || "Giáo viên",
              room: classItem.address,
            };
          }
        }
      });
    });
    return result;
  };

  const fetchSchedule = async () => {
    try {
      const res = await ScheduleService.getStudentSchedule(studentId, token);
      const formatted = formatSchedule(res?.data || []);
      setScheduleData(formatted);
    } catch (error) {
      console.error("Lỗi lấy lịch học học viên:", error);
    }
  };

  useEffect(() => {
    if (studentId && token) fetchSchedule();
  }, [studentId, token, currentDate]);

  return (
    <ScheduleContainer>
      <HeaderSection>
        <div className="left">
          <Button
            className="arrow-btn"
            icon={<LeftOutlined />}
            onClick={handlePrevWeek}
          />
          <Button
            className="arrow-btn"
            icon={<RightOutlined />}
            onClick={handleNextWeek}
          />
          <Button className="today-btn" onClick={handleToday}>
            Hôm nay
          </Button>
          <DatePicker
            allowClear={false}
            value={dayjs(currentDate)}
            onChange={handleDateChange}
            format="DD/MM/YYYY"
            locale="vi"
          />
          <div className="date-range">
            {days[0].fullDate.toLocaleDateString("vi-VN")} -{" "}
            {days[6].fullDate.toLocaleDateString("vi-VN")}
          </div>
        </div>
        <div className="right">
          <Button className="tab active">Tuần</Button>
        </div>
      </HeaderSection>

      <ScheduleTable>
        <thead>
          <tr>
            <th>Ca học</th>
            {days.map((day) => (
              <th key={day.date}>
                {day.label}, {day.date}
              </th>
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
                      <ClassCard>
                        <div className="class-name">{cell.name}</div>
                        <div className="level">🎯 {cell.level}</div>
                        <div className="teacher">👤 {cell.teacher}</div>
                        <div className="room">🏫 {cell.room}</div>
                      </ClassCard>
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

export default StudentSchedulePage;
