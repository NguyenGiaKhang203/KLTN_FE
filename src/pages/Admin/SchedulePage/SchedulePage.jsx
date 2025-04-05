// SchedulePage.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';
import {
  ScheduleContainer,
  FilterSection,
  ScheduleTable,
  TimeCell,
  ClassCell,
  ClassCard,
} from './style';

const { Option } = Select;

const getWeekDays = (startDate = new Date()) => {
  const result = [];
  const start = new Date(startDate);
  const day = start.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + mondayOffset);

  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);

    const label = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][i];
    const date = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });

    result.push({ label, date, fullDate: d });
  }

  return result;
};

const timeSlots = [
  { id: 'ca1', label: '07H00 - 09H00', time: '07:00 - 09:00' },
  { id: 'ca2', label: '09H00 - 11H00', time: '09:00 - 11:00' },
  { id: 'ca3', label: '15H00 - 17H00', time: '15:00 - 17:00' },
  { id: 'ca4', label: '19H00 - 21H00', time: '19:00 - 21:00' },
];

const SchedulePage = () => {
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({});
  const [scheduleData, setScheduleData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = useMemo(() => getWeekDays(currentDate), [currentDate]);

  useEffect(() => {
    fetchFilters();
    mockSchedule();
  }, []);

  const fetchFilters = async () => {
    try {
      const [teacherRes, roomRes] = await Promise.all([
        axios.get('/api/teachers'),
        axios.get('/api/rooms'),
      ]);
      setTeachers(teacherRes.data);
      setRooms(roomRes.data);
    } catch (err) {
      console.error('Failed to fetch filter data:', err);
    }
  };

  const mockSchedule = () => {
    const mock = {};
    const randomDate = days[1].date; // T3
    mock[randomDate] = {
      ca3: {
        name: 'NHL 78 - CB - HLV. THỰC ANH',
        level: 'CƠ BẢN',
        teacher: 'THỰC ANH',
        room: 'Phòng 1',
      },
    };
    setScheduleData(mock);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    // Gọi API fetchSchedule nếu cần
  };

  return (
    <ScheduleContainer>
      <FilterSection>
        <Select
          placeholder="Giáo viên"
          style={{ width: 160 }}
          onChange={(val) => handleFilterChange('teacher', val)}
          allowClear
        >
          {teachers.map((t) => (
            <Option key={t.id} value={t.id}>{t.name}</Option>
          ))}
        </Select>

        <Select
          placeholder="Phòng học"
          style={{ width: 160 }}
          onChange={(val) => handleFilterChange('room', val)}
          allowClear
        >
          {rooms.map((r) => (
            <Option key={r.id} value={r.id}>{r.name}</Option>
          ))}
        </Select>

        <Select
          defaultValue="all"
          style={{ width: 140 }}
          onChange={(val) => handleFilterChange('slot', val)}
        >
          <Option value="all">Tất cả ca</Option>
          <Option value="morning">Buổi sáng</Option>
          <Option value="afternoon">Buổi chiều</Option>
        </Select>

        <Select
          defaultValue="all"
          style={{ width: 160 }}
          onChange={(val) => handleFilterChange('program', val)}
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
                {day.label}<br />
                <small>{day.date}</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot) => (
            <tr key={slot.id}>
              <TimeCell>
                {slot.label}<br />
                <small>{slot.time}</small>
              </TimeCell>
              {days.map((day) => {
                const cell = scheduleData?.[day.date]?.[slot.id];
                return (
                  <ClassCell key={`${day.date}-${slot.id}`}>
                    {cell && (
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
