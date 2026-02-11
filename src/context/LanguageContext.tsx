import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'he' | 'th';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  // Login
  'login.title': { en: 'Factory Maintenance', he: 'תחזוקת מפעל', th: 'การบำรุงรักษาโรงงาน' },
  'login.username': { en: 'Username', he: 'שם משתמש', th: 'ชื่อผู้ใช้' },
  'login.login': { en: 'Login', he: 'התחבר', th: 'เข้าสู่ระบบ' },
  
  // Home
  'home.title': { en: 'Maintenance Reports', he: 'דוחות תחזוקה', th: 'รายงานการบำรุงรักษา' },
  'home.morningRound': { en: 'Morning Round Report', he: 'סיבוב בוקר', th: 'รายงานรอบเช้า' },
  'home.maintenanceLog': { en: 'Maintenance Log', he: 'יומן אחזקה', th: 'บันทึกการบำรุงรักษา' },
  'home.treatmentsReport': { en: 'Treatments Report', he: 'טיפולים', th: 'รายงานการรักษา' },
  'home.forkliftReport': { en: 'Forklift Report', he: 'מלגזות', th: 'รายงานรถยก' },
  'home.annualPlans': { en: 'Annual Plans', he: 'תוכניות שנתיות', th: 'แผนประจำปี' },
  'home.viewReports': { en: 'View Reports', he: 'צפה בדוחות', th: 'ดูรายงาน' },
  'home.settings': { en: 'Settings', he: 'הגדרות', th: 'การตั้งค่า' },
  
  // Morning Round
  'morning.title': { en: 'Morning Round', he: 'סיבוב בוקר', th: 'รอบเช้า' },
  'morning.date': { en: 'Date', he: 'תאריך', th: 'วันที่' },
  'morning.performedBy': { en: 'Performed by', he: 'בוצע על ידי', th: 'ดำเนินการโดย' },
  'morning.checklist': { en: 'Checklist', he: 'רשימת בדיקות', th: 'รายการตรวจสอบ' },
  'morning.comments': { en: 'Comments', he: 'הערות', th: 'ความคิดเห็น' },
  'morning.submit': { en: 'Submit Report', he: 'שלח דוח', th: 'ส่งรายงาน' },
  
  // Morning Round Checklist Items
  'check.1': { en: 'Initial reception and washing', he: 'קבלה ושטיפה ראשונית', th: 'การรับและการล้างเบื้องต้น' },
  'check.2': { en: 'Hopper - Motors, bearings, belt, auto lubrication', he: 'הופר- מנועים, מיסבים, סרט, שימון אוטו\'', th: 'ฮอปเปอร์ - มอเตอร์ ตลับลูกปืน สายพาน หล่อลื่นอัตโนมัติ' },
  'check.3': { en: 'Stars - Integrity, bearings, motors + relays', he: 'כוכבים- שלמות, מיסבים, מנועים+ ממסרות', th: 'ดาว - ความสมบูรณ์ ตลับลูกปืน มอเตอร์ + รีเลย์' },
  'check.4': { en: 'Ground evacuation conveyors', he: 'מסועי פינוי אדמה', th: 'สายพานระบายอดมดิน' },
  'check.5': { en: 'Distonner elevator, carousel, automatic gearbox', he: 'מעלית דיסטונר, קרוסלה, גירוז אוטומטי', th: 'ลิฟต์ดิสโทนเนอร์ สไลด์รอบ ระบบเกียร์อัตโนมัติ' },
  'check.6': { en: 'Wash drum - Belts, exit elevator, door at exit', he: 'תוף שטיפה- רצועות, מעלית הוצאה, דלת ביציאה', th: 'กลองซัก - สายพาน ลิฟต์ออก ประตูที่ทางออก' },
  'check.7': { en: 'Mangnette', he: 'מקנבת', th: 'แมกเนตต์' },
  'check.8': { en: 'Polishers - Belts, brushes, exit doors, speed and rotation direction', he: 'מלטשות- רצועות, מברשות, דלתות יציאה, מהירות וכיוון סיבוב', th: 'เครื่องขัด - สายพาน แปรง ประตูออก ความเร็วและทิศทางการหมุน' },
  'check.9': { en: 'Blue belt and entrance to packing house', he: 'סרט כחול וכניסה לבית אריזה', th: 'สายพานสีน้ำเงินและทางเข้าบ้านบรรจุ' },
  'check.10': { en: 'Round water pit', he: 'בור מיים עגול', th: 'หลุมน้ำกลม' },
  'check.11': { en: 'Sorting and pool area', he: 'איזור ממיינות ובריכות', th: 'บริเวณการเรียงลำดับและสระว่ายน้ำ' },
  'check.12': { en: 'Elevator and distribution lines to sorters', he: 'מעלית ומסתי חלוקה לממיינות', th: 'ลิฟต์และเส้นแจกจ่ายไปยังเครื่องเรียงลำดับ' },
  'check.13': { en: 'Feed conveyors, vibrators, lighting, camera area cleanliness', he: 'מסועי הזנה, ויברטורים, תאורה,ניקיון איזור מצלמות', th: 'สายพานป้อน ไวเบรเตอร์ แสงสว่าง ความสะอาดพื้นที่กล้อง' },
  'check.14': { en: 'Integrity of all fingers, verify all lines are aligned', he: 'תקינות כל האצבעות, לבדוק שכל הקוים מיושרים', th: 'ความสมบูรณ์ของนิ้วทั้งหมด ตรวจสอบว่าเส้นทั้งหมดจัดตำแหน่งแล้ว' },
  'check.15': { en: 'Conveyors under sorters and spillage to pools', he: 'מסועים מתחת לממיינות ושפיכה לבריכות', th: 'สายพานใต้เครื่องเรียงลำดับและการหลั่งไปยังสระว่ายน้ำ' },
  'check.16': { en: 'Weekly sorter trigger adjustment and replacement of faulty fingers', he: 'פעם בשבוע כיוון טריגרים בממיינת והחלפת אצבעות לא תקינות', th: 'การปรับตัวกระตุ้นเครื่องเรียงลำดับรายสัปดาห์และแทนที่นิ้วที่ชำรุด' },
  'check.17': { en: 'Elevators and conveyors for extraction from pools to manual sorting stations', he: 'מעליות ומסועים של הוצאה מבריכות ועד לעמדות הבירור הידני', th: 'ลิฟต์และสายพานสำหรับการสกัดจากสระว่ายน้ำไปยังสถานีการจัดเรียงลำดับด้วยตนเอง' },
  'check.18': { en: 'General conveyors throughout the packing house', he: 'מסועים כללי בכל בית האריזה', th: 'สายพานทั่วไปทั่วทั้งบ้านบรรจุ' },
  'check.19': { en: 'Packing array inspection', he: '"פרוט בדיקת מערך אריזה', th: 'การตรวจสอบระบบบรรจุ' },
  'check.20': { en: 'Weighing cells, vibration channels, conveyor, packing machine, solenoids, direction conveyor, safety doors', he: 'תאי שקילה, תעלות מרעד, מסוע, מכונת אריזה, מלחמים, מסוע כיוונים, דלתות בטיחות"', th: 'เซลล์ชั่งน้ำหนัก ช่องการสั่น สายพาน เครื่องบรรจุ ขดลวดแม่เหล็กไฟฟ้า สายพานทิศทาง ประตูนิรภัย' },
  'check.21': { en: 'Packing machine 1', he: 'מכונת  אריזה 1', th: 'เครื่องบรรจุ 1' },
  'check.22': { en: 'Packing machine 2', he: 'מכונת  אריזה 2', th: 'เครื่องบรรจุ 2' },
  'check.23': { en: 'Packing machine 3', he: 'מכונת  אריזה 3', th: 'เครื่องบรรจุ 3' },
  'check.24': { en: 'Packing machine 4', he: 'מכונת  אריזה 4', th: 'เครื่องบรรจุ 4' },
  'check.25': { en: 'Packing machine 5', he: 'מכונת  אריזה 5', th: 'เครื่องบรรจุ 5' },
  'check.26': { en: 'Packing machine 6', he: 'מכונת  אריזה 6', th: 'เครื่องบรรจุ 6' },
  'check.27': { en: 'Packing machine 7', he: 'מכונת  אריזה 7', th: 'เครื่องบรรจุ 7' },
  'check.28': { en: 'Automatic platform for large bags (blue color)', he: 'ממשטח אוטומטי  לשקים גדולים   (בצבע כחול  )', th: 'แพลตฟอร์มอัตโนมัติสำหรับถุงใหญ่ (สีน้ำเงิน)' },
  'check.29': { en: 'Visco automatic platform - for bags and cartons (yellow color)', he: 'ממשטח אוטומטי ויסקון -  לשקיות וקרטונים  ( בצבע צהוב)', th: 'แพลตฟอร์มอัตโนมัติ Visco - สำหรับถุงและกล่อง (สีเหลือง)' },
  'check.30': { en: 'Automatic packing system - Bag extraction, rotating drum', he: 'מערכת אריזה אוטומטית - משיכת שקיות, תוף מסובב', th: 'ระบบบรรจุอัตโนมัติ - การดึงถุง กลองหมุน' },
  'check.31': { en: 'Step conveyors, regular conveyors', he: 'מסועי שלבים, מסועים רגילים', th: 'สายพานขั้นบันได สายพานธรรมดา' },
  'check.32': { en: 'Bag stacker - Agtek', he: 'מסדר שקיות - אגטק', th: 'เครื่องวางถุง - Agtek' },
  'check.33': { en: 'Compressor room cooling rooms', he: 'חדר מדחסים חדרי קירור', th: 'ห้องลูกอัดไป ห้องเย็น' },
  'check.34': { en: 'Search for scattered work tools in the production hall unnecessary for current work, screws, nails, screwdrivers, hammer and any other maintenance equipment (Note: all repair tools must be only in the tool box)', he: 'חיפוש אחר כלי עבודה מפוזרים באולם ייצור, שלא לצורך,  ברגים, מסמרים, מברג , פטיש וכל ציוד של תחזוקה אחר.  (הערה: כל כלי העבודה לתיקון-  צרכים להיות אך ורק בתוך ארגז כלים)', th: 'ค้นหาเครื่องมือที่กระจัดกระจายในห้องการผลิต ที่ไม่จำเป็น สกรู ตะปู ไขควง ค้อน และอุปกรณ์บำรุงรักษาอื่น ๆ (หมายเหตุ: เครื่องมือซ่อมทั้งหมดต้องอยู่ในกล่องเครื่องมือเท่านั้น)' },
  'check.35': { en: 'Check metal detector operation', he: 'בקרת גלאי מתכות', th: 'ตรวจสอบการทำงานของเครื่องตรวจจับโลหะ' },
  'check.36': { en: 'Various faults', he: 'תקלות שונות', th: 'ความผิดพลาดต่างๆ' },

  
  // Maintenance Log
  'log.title': { en: 'Maintenance Log', he: 'יומן אחזקה', th: 'บันทึกการบำรุงรักษา' },
  'log.date': { en: 'Date', he: 'תאריך', th: 'วันที่' },
  'log.machine': { en: 'Machine Name & Number', he: 'שם ומספר מכונה', th: 'ชื่อและหมายเลขเครื่อง' },
  'log.fault': { en: 'Fault Description', he: 'תאור התקלה ותיאור התיקון ', th: ' คำอธิบายของปัญหา + และคำอธิบายการซ่อม' },
  'log.spareParts': { en: 'Spare Parts', he: 'רשימת החלפים ', th: 'อะไหล่' },
  'log.workHours': { en: 'Work Hours', he: 'שעות עבודה', th: 'ชั่วโมงทำงาน' },
  'log.technician': { en: 'Technician Name', he: 'שם טכנאי', th: 'ชื่อช่างเทคนิค' },
  'log.status': { en: 'Status', he: 'סטטוס', th: 'สถานะ' },
  'log.worker': { en: 'worker name', he: 'שם עובד', th: 'ชื่อพนักงาน' },
  'log.clearance': { en: 'Clearance', he: ' אישור חזרה בטוחה לעבודה', th: 'ใบอนุญาตอย่างเป็นทางการให้กลับมาปฏิบัติงาน' },
  'log.update': { en: 'update manager', he: 'עדכון מנהל תפעול /מנהל משמרת על סיום תיקון תקלה', th: 'การแจ้งผู้จัดการฝ่ายปฏิบัติการหรือหัวหน้ากะ เมื่อการแก้ไขและซ่อมแซมความขัดข้องเสร็จสิ้นแล้ว' },
  'log.notes': { en: 'Additional Notes', he: 'הערות ', th: 'ความคิดเห็น' },
  'log.declaration': { en: 'I confirm the accuracy of this report', he: 'ברישום הביצוע, הנני מצהיר כי בדקתי את האזור בסיום העבודה, כולל בדיקת איסוף כלים וחלקים, קשירת חוטים וניקיון לפי צרכי בטיחות המוצר ואני מאשר חזרה לעבודה.', th: 'ในบันทึกการปฏิบัติงาน ฉันขอประกาศว่าฉันได้ตรวจสอบพื้นที่เมื่อสิ้นสุดการทำงาน รวมถึงการตรวจสอบการรวบรวมเครื่องมือและชิ้นส่วน การผูกสายไฟ และการทำความสะอาดตามความต้องการด้านความปลอดภัยของผลิตภัณฑ์ และฉันอนุมัติให้กลับมาทำงานได้' },
  'log.photo': { en: 'Photo', he: 'תמונה', th: 'รูปภาพ' },
  'log.takePicture': { en: 'Take Picture', he: 'צלם תמונה', th: 'ถ่ายภาพ' },
  'log.name': { en: 'Name', he: 'שם', th: 'ชื่อ' },
  'log.addRow': { en: 'Add Row', he: 'הוסף שורה', th: 'เพิ่มแถว' },
  'log.removeRow': { en: 'Remove', he: 'הסר', th: 'ลบ' },
  
  // Treatments Report
  'treatments.title': { en: 'Treatments Report', he: 'דוח טיפולים', th: 'รายงานการรักษา' },
  'treatments.equipment': { en: 'Equipment', he: 'ציוד', th: 'อุปกรณ์' },
  'treatments.airCompressor': { en: 'Air Compressor', he: 'מדחס אוויר', th: 'คอมเพรสเซอร์' },
  'treatments.coolingSystem': { en: 'Cooling System', he: 'מערכת קירור', th: 'ระบบทำความเย็น' },
  'treatments.treatmentType': { en: 'Treatment Type', he: 'סוג טיפול', th: 'ประเภทการรักษา' },
  'treatments.description': { en: 'Description', he: 'תיאור', th: 'รายละเอียด' },
  'treatments.nextScheduled': { en: 'Next Scheduled Date', he: 'תאריך מתוכנן הבא', th: 'วันที่กำหนดถัดไป' },
  
  // Forklift Report
  'forklift.title': { en: 'Forklift Report', he: 'מלגזה', th: 'รายงานรถยก' },
  'forklift.treatments': { en: 'Treatments', he: 'טיפולים', th: 'การรักษา' },
  'forklift.faults': { en: 'Faults', he: 'תקלות', th: 'ความผิดพลาด' },
  'forklift.inspection': { en: 'Inspection/Test', he: 'טסט', th: 'การตรวจสอบ/ทดสอบ' },
  'forklift.faultType': { en: 'Fault Type', he: 'סוג תקלה', th: 'ประเภทความผิดพลาด' },
  'forklift.repairCost': { en: 'Repair Cost', he: 'עלות תיקון', th: 'ต้นทุนการซ่อม' },
  'forklift.testDate': { en: 'Test Date', he: 'תאריך בדיקה', th: 'วันที่ทดสอบ' },
  'forklift.expirationDate': { en: 'Expiration Date', he: 'תאריך תפוגה', th: 'วันหมดอายุ' },
  
  // Annual Plans
  'annual.preventive': { en: 'Annual Preventive Plan', he: 'תוכנית מניעה שנתית', th: 'แผนป้องกันประจำปี' },
  'annual.summer': { en: 'Summer Maintenance Plan', he: 'תוכנית תחזוקת קיץ', th: 'แผนบำรุงรักษาฤดูร้อน' },
  'annual.year': { en: 'Year', he: 'שנה', th: 'ปี' },
  'annual.month': { en: 'Month', he: 'חודש', th: 'เดือน' },
  'annual.lubricationIntake': { en: 'Lubrication – Intake System', he: 'שימון – מערכת קליטה', th: 'การหล่อลื่น – ระบบท่อดูด' },
  'annual.lubricationConveyors': { en: 'Lubrication – Conveyors', he: 'שימון – מסועים', th: 'การหล่อลื่น – สายพาน' },
  'annual.coolingService': { en: 'Monthly Cooling Room Service', he: 'שירות חדר קירור חודשי', th: 'บริการห้องเย็นรายเดือน' },
  'annual.tempSensorInspection': { en: 'Annual Temperature Sensor Inspection', he: 'בדיקת חיישן טמפרטורה שנתית', th: 'ตรวจสอบเซ็นเซอร์อุณหภูมิประจำปี' },
  'annual.plannedStart': { en: 'Planned Start Date', he: 'תאריך התחלה מתוכנן', th: 'วันที่เริ่มตามแผน' },
  'annual.requiredDays': { en: 'Required Work Days', he: 'ימי עבודה נדרשים', th: 'จำนวนวันที่ต้องการ' },
  'annual.plannedFinish': { en: 'Planned Finish Date', he: 'תאריך סיום מתוכנן', th: 'วันที่สิ้นสุดตามแผน' },
  'annual.actualStart': { en: 'Actual Start Date', he: 'תאריך התחלה בפועל', th: 'วันที่เริ่มจริง' },
  'annual.actualFinish': { en: 'Actual Finish Date', he: 'תאריך סיום בפועל', th: 'วันที่สิ้นสุดจริง' },
  'annual.performedBy': { en: 'Performed By', he: 'בוצע על ידי', th: 'ดำเนินการโดย' },
  'annual.plannedWork': { en: 'Planned Work Description', he: 'תיאור עבודה מתוכנן', th: 'รายละเอียดงานที่วางแผน' },
  'annual.addDate': { en: 'Add Date', he: 'הוסף תאריך', th: 'เพิ่มวันที่' },
  
  // Machines
  'machine.carrotIntake': { en: 'Carrot Intake System', he: 'מערכת קליטת גזר', th: 'ระบบรับแครอท' },
  'machine.dryCleaning': { en: 'Dry Cleaning', he: 'ניקוי יבש', th: 'ทำความสะอาดแห้ง' },
  'machine.washingDrum': { en: 'Washing Drum', he: 'תוף כביסה', th: 'กลองซักผ้า' },
  'machine.sortingBelt': { en: 'Sorting Belt', he: 'רצועת מיון', th: 'สายพานคัดแยก' },
  'machine.perforator': { en: 'Perforator', he: 'מחורר', th: 'เครื่องเจาะ' },
  
  // Maintenance Log Machines
  'machine.sorter1': { en: 'Sorter 1', he: 'ממיינת 1', th: 'เครื่องเรียงลำดับ 1' },
  'machine.sorter2': { en: 'Sorter 2', he: 'ממיינת 2', th: 'เครื่องเรียงลำดับ 2' },
  'machine.sorter3': { en: 'Sorter 3', he: 'ממיינת 3', th: 'เครื่องเรียงลำดับ 3' },
  'machine.scale1': { en: 'Scale 1', he: 'משקל 1', th: 'เครื่องชั่ง 1' },
  'machine.packing1': { en: 'Packing 1', he: 'אריזה 1', th: 'การบรรจุ 1' },
  'machine.scale2': { en: 'Scale 2', he: 'משקל 2', th: 'เครื่องชั่ง 2' },
  'machine.packing2': { en: 'Packing 2', he: 'אריזה 2', th: 'การบรรจุ 2' },
  'machine.scale3': { en: 'Scale 3', he: 'משקל 3', th: 'เครื่องชั่ง 3' },
  'machine.packing3': { en: 'Packing 3', he: 'אריזה 3', th: 'การบรรจุ 3' },
  'machine.scale4': { en: 'Scale 4', he: 'משקל 4', th: 'เครื่องชั่ง 4' },
  'machine.packing4': { en: 'Packing 4', he: 'אריזה 4', th: 'การบรรจุ 4' },
  'machine.scale5': { en: 'Scale 5', he: 'משקל 5', th: 'เครื่องชั่ง 5' },
  'machine.packing5a': { en: 'Packing 5a', he: 'אריזה 5א', th: 'การบรรจุ 5a' },
  'machine.packing5b': { en: 'Packing 5b', he: 'אריזה 5ב', th: 'การบรรจุ 5b' },
  'machine.scale6': { en: 'Scale 6', he: 'משקל 6', th: 'เครื่องชั่ง 6' },
  'machine.packing6a': { en: 'Packing 6a', he: 'אריזה 6א', th: 'การบรรจุ 6a' },
  'machine.packing6b': { en: 'Packing 6b', he: 'אריזה 6ב', th: 'การบรรจุ 6b' },
  'machine.sorterLine6': { en: 'Sorter Line 6', he: 'סדרן 6', th: 'สายสดดดรรณ์ 6' },
  'machine.sorterLine5': { en: 'Sorter Line 5', he: 'סדרן 5', th: 'สายสดดดรรณ์ 5' },
  'machine.masters': { en: 'Masters', he: 'מאסטרים', th: 'มาสเตอร์' },
  'machine.conveyorMotor': { en: 'Conveyor Motor', he: 'מסועים מנוע', th: 'มอเตอร์สายพาน' },
  'machine.conveyorBelt': { en: 'Conveyor Belt', he: 'מסועים סרט', th: 'สายพานลำเลียง' },
  'machine.conveyorShaft': { en: 'Conveyor Shaft', he: 'מסועים ציר', th: 'เพลาสายพาน' },
  'machine.polisher1': { en: 'Polisher 1', he: 'פולישר 1', th: 'เครื่องขัด 1' },
  'machine.polisher2': { en: 'Polisher 2', he: 'פולישר 2', th: 'เครื่องขัด 2' },
  'machine.polisher3': { en: 'Polisher 3', he: 'פולישร 3', th: 'เครื่องขัด 3' },
  'machine.onionArray': { en: 'Onion Array', he: 'מערך בצל', th: 'อาร์เรย์หอม' },
  'machine.externalWashDrum': { en: 'External Wash Drum', he: 'תוף שטיפה חיצוני', th: 'กลองซักภายนอก' },
  'machine.viscose': { en: 'Viscose', he: 'ויסכון', th: 'วิสโคส' },
  'machine.wearBroken3': { en: 'Wear Broken 3', he: 'ורברוכן 3', th: 'สึกหรอหักเหล 3' },
  'machine.wearBroken2': { en: 'Wear Broken 2', he: 'ורברוכן 2', th: 'สึกหรอหักเหล 2' },
  'machine.accumulatorInside': { en: 'Accumulator Inside', he: 'צוברים פנים', th: 'สะสมภายใน' },
  'machine.accumulatorOutside': { en: 'Accumulator Outside', he: 'צוברים חוץ', th: 'สะสมภายนอก' },
  'machine.smallHopper': { en: 'Small Hopper', he: 'הופר קטן', th: 'ฮอปเปอร์เล็ก' },
  'machine.largeHopper': { en: 'Large Hopper', he: 'הופר גדול', th: 'ฮอปเปอร์ใหญ่' },
  'machine.dryCleaningProcess': { en: 'Dry Cleaning Process', he: 'ניקוי יבש', th: 'กระบวนการทำความสะอาดแห้ง' },
  'machine.soakingTank': { en: 'Soaking Tank', he: 'בריכת השרייה', th: 'ถัง浸' },
  'machine.internalWashDrum': { en: 'Internal Wash Drum', he: 'תוף שטיפה', th: 'กลองซักภายใน' },
  'machine.magnet': { en: 'Magnet', he: 'מקנבת', th: 'แม่เหล็ก' },
  'machine.waterPump': { en: 'Water Pump', he: 'משאבת מים', th: 'ปั๊มน้ำ' },
  'machine.chlorineSystem': { en: 'Chlorine System', he: 'מערכת כלור', th: 'ระบบคลอรีน' },
  'machine.lubrication': { en: 'Lubrication System', he: 'מערכת זחיחים', th: 'ระบบการหล่อลื่น' },
  'machine.coolingDoor': { en: 'Cooling Door', he: 'דלת קירור', th: 'ประตูเย็น' },
  'machine.select': { en: 'Select a machine ', he: 'בחר מכונה', th: 'เลือกเครื่องจักร' },

  // Technicians
  'tech.eli': { en: 'Eli', he: 'אלי', th: 'เอลี' },
  'tech.thaiDom': { en: 'Thai Dom', he: 'תאי דום', th: 'ไทย ดอม' },
  'tech.solomon': { en: 'Solomon', he: 'שלמה', th: 'โซโลมอน' },
  'tech.yehuda': { en: 'Yehuda', he: 'יהודה', th: 'เยฮูดา' },
  
  // View Reports
  'reports.title': { en: 'View Reports', he: 'צפה בדוחות', th: 'ดูรายงาน' },
  'reports.selectType': { en: 'Select Report Type', he: 'בחר סוג דוח', th: 'เลือกประเภทรายงาน' },
  'reports.morningRound': { en: 'Morning Round Reports', he: 'דוחות סיבוב בוקר', th: 'รายงานรอบเช้า' },
  'reports.maintenanceLog': { en: 'Maintenance Log Reports', he: 'דוחות יומן אחזקה', th: 'รายงานบันทึกการบำรุงรักษา' },
  'reports.submittedBy': { en: 'Submitted by', he: 'הוגש על ידי', th: 'ส่งโดย' },
  'reports.filterByDate': { en: 'Filter by Date', he: 'סנן לפי תאריך', th: 'กรองตามวันที่' },
  
  // Report Details
  'details.title': { en: 'Report Details', he: 'פרטי דוח', th: 'รายละเอียดรายงาน' },
  'details.reportInfo': { en: 'Report Information', he: 'מידע דוח', th: 'ข้อมูลรายงาน' },
  'details.submittedOn': { en: 'Submitted on', he: 'הוגש ב', th: 'ส่งเมื่อ' },
  
  // Settings
  'settings.title': { en: 'Settings', he: 'הגדרות', th: 'การตั้งค่า' },
  'settings.language': { en: 'Change Language', he: 'שנה שפה', th: 'เปลี่ยนภาษา' },
  'settings.machines': { en: 'Machines List', he: 'רשימת מכונות', th: 'รายการเครื่องจักร' },
  'settings.faultTypes': { en: 'Fault Types', he: 'סוגי תקלות', th: 'ประเภทความผิดพลาด' },
  'settings.users': { en: 'Users', he: 'משתמשים', th: 'ผู้ใช้' },
  
  // Common
  'common.back': { en: 'Back', he: 'חזור', th: 'กลับ' },
  'common.save': { en: 'Save', he: 'שמור', th: 'บันทึก' },
  'common.cancel': { en: 'Cancel', he: 'ביטול', th: 'ยกเลิก' },
  'common.complete': { en: 'Complete', he: 'הושלם', th: 'เสร็จสิ้น' },
  'common.pending': { en: 'Pending', he: 'ממתין', th: 'รอดำเนินการ' },
  'common.inProgress': { en: 'In Progress', he: 'בתהליך', th: 'กำลังดำเนินการ' },
  'common.submit': { en: 'Submit', he: 'שלח', th: 'ส่ง' },
  'common.date': { en: 'Date', he: 'תאריך', th: 'วันที่' },
  'common.description': { en: 'Description', he: 'תיאור', th: 'รายละเอียด' },
  'common.cost': { en: 'Cost', he: 'עלות', th: 'ต้นทุน' },
  'common.technician': { en: 'Technician', he: 'טכנאי', th: 'ช่างเทคนิค' },
  'common.forkliftnumber': { en: 'Forklift number', he: 'מספר רישוי מלגזה', th: 'รายงานรถยก' },

  
  // Months
  'month.jan': { en: 'January', he: 'ינואר', th: 'มกราคม' },
  'month.feb': { en: 'February', he: 'פברואר', th: 'กุมภาพันธ์' },
  'month.mar': { en: 'March', he: 'מרץ', th: 'มีนาคม' },
  'month.apr': { en: 'April', he: 'אפריל', th: 'เมษายน' },
  'month.may': { en: 'May', he: 'מאי', th: 'พฤษภาคม' },
  'month.jun': { en: 'June', he: 'יוני', th: 'มิถุนายน' },
  'month.jul': { en: 'July', he: 'יולי', th: 'กรกฎาคม' },
  'month.aug': { en: 'August', he: 'אוגוסט', th: 'สิงหาคม' },
  'month.sep': { en: 'September', he: 'ספטמבר', th: 'กันยายน' },
  'month.oct': { en: 'October', he: 'אוקטובר', th: 'ตุลาคม' },
  'month.nov': { en: 'November', he: 'נובמבר', th: 'พฤศจิกายน' },
  'month.dec': { en: 'December', he: 'דצמבר', th: 'ธันวาคม' },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('he');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  useEffect(() => {
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t, 
        isRTL: language === 'he' 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}