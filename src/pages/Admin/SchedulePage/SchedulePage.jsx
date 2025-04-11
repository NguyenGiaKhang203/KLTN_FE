import React, { useEffect, useMemo, useState } from "react";
import { Select } from "antd";
import * as ScheduleService from "../../../services/ScheduleService";
import {
  ScheduleContainer,
  FilterSection,
  ScheduleTable,
  TimeCell,
  ClassCell,
  ClassCard,
} from "./style";
import { useSelector } from "react-redux";

const { Option } = Select;

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
  { id: "ca1", label: "07H00 - 09H00", time: "07:00" },
  { id: "ca2", label: "09H00 - 11H00", time: "09:00" },
  { id: "ca3", label: "15H00 - 17H00", time: "15:00" },
  { id: "ca4", label: "19H00 - 21H00", time: "19:00" },
];

const SchedulePage = () => {
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({ slot: "all", program: "all" });
  const [scheduleData, setScheduleData] = useState({});
  const [currentDate] = useState(new Date());

  const days = useMemo(() => getWeekDays(currentDate), [currentDate]);
  const user = useSelector((state) => state.user);
  const id = user?.user?._id;
  const token = user?.access_token;

  const fetchSchedule = async () => {
    try {
      const response = await ScheduleService.getTeacherSchedule(id, token);
      const formattedData = formatSchedule(response?.data || [], days);
      setScheduleData(formattedData);
    } catch (err) {
      console.error("Failed to fetch schedule:", err);
    }
  };

  useEffect(() => {
    if (id && token) {
      fetchSchedule();
    }
  }, [id, token]);

  const formatSchedule = (data) => {
    const result = {};

    data.forEach((classItem) => {
      classItem.schedule.forEach((sch) => {
        // Chuyển 'Thứ 2' thành date tương ứng trong tuần hiện tại
        const matchedDay = days.find((d) => {
          return d.label === sch.day.replace("Thứ ", "T"); // "Thứ 2" → "T2"
        });

        if (matchedDay) {
          const dateKey = matchedDay.date;

          if (!result[dateKey]) result[dateKey] = {};

          // Xác định ca học dựa vào startTime (ví dụ 18:00 thì là ca4)
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
              teacher: "Bạn", // hoặc tên giáo viên nếu có
              room: classItem.address,
            };
          }
        }
      });
    });

    return result;
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const isSlotVisible = (slotId) => {
    if (filters.slot === "morning") return slotId === "ca1" || slotId === "ca2";
    if (filters.slot === "afternoon")
      return slotId === "ca3" || slotId === "ca4";
    return true;
  };

  const shouldShowCell = (cell) => {
    if (!cell) return false;
    if (filters.teacher && filters.teacher !== cell.teacher) return false;
    if (filters.room && filters.room !== cell.room) return false;
    if (
      filters.program &&
      filters.program !== "all" &&
      filters.program !== cell.program
    )
      return false;
    return true;
  };

  return (
    <ScheduleContainer>
      <FilterSection>
        <Select
          placeholder="Giáo viên"
          style={{ width: 160 }}
          onChange={(val) => handleFilterChange("teacher", val)}
          allowClear
        >
          {teachers.map((t) => (
            <Option key={t.id} value={t.name}>
              {t.name}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Phòng học"
          style={{ width: 160 }}
          onChange={(val) => handleFilterChange("room", val)}
          allowClear
        >
          {rooms.map((r) => (
            <Option key={r.id} value={r.name}>
              {r.name}
            </Option>
          ))}
        </Select>

        <Select
          defaultValue="all"
          style={{ width: 140 }}
          onChange={(val) => handleFilterChange("slot", val)}
        >
          <Option value="all">Tất cả ca</Option>
          <Option value="morning">Buổi sáng</Option>
          <Option value="afternoon">Buổi chiều</Option>
        </Select>

        <Select
          defaultValue="all"
          style={{ width: 160 }}
          onChange={(val) => handleFilterChange("program", val)}
        >
          <Option value="all">Tất cả chương trình</Option>
          <Option value="basic">Cơ bản</Option>
          <Option value="advanced">Nâng cao</Option>
        </Select>
      </FilterSection>

      <ScheduleTable>
        <thead>
          <tr>
            <th>Ca học</th>
            {days.map((day) => (
              <th key={day.date}>
                {day.label}
                <br />
                <small>{day.date}</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots
            .filter((slot) => isSlotVisible(slot.id))
            .map((slot) => (
              <tr key={slot.id}>
                <TimeCell>
                  {slot.label}
                  <br />
                  <small>{slot.time}</small>
                </TimeCell>
                {days.map((day) => {
                  const cell = scheduleData?.[day.date]?.[slot.id];
                  return (
                    <ClassCell key={`${day.date}-${slot.id}`}>
                      {shouldShowCell(cell) && (
                        <ClassCard>
                          <div className="class-name">{cell.name}</div>
                          <div className="level">{cell.level}</div>
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

export default SchedulePage;
