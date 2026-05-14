import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory "database" for the demo session
  const db = {
    admissions: [
      { 
        id: '1', 
        name: 'Kareem Abdulla', 
        courseId: 'dmt', 
        phone: '01711122233', 
        paymentMethod: 'bkash', 
        paymentNumber: '01711122233', 
        transactionId: '8K976X2P', 
        status: 'pending',
        submittedAt: new Date().toISOString()
      },
      { 
        id: '2', 
        name: 'Sara Khan', 
        courseId: 'icu-assistant', 
        phone: '01811122233', 
        paymentMethod: 'nagad', 
        paymentNumber: '01811122233', 
        transactionId: '7L885Y3Q', 
        status: 'pending',
        submittedAt: new Date().toISOString()
      }
    ],
    notices: [
      { id: '1', title: 'Welcome to IHT ADDMISSION ACADEMY', content: 'Admission is now open for Spring 2026 session.', date: new Date().toISOString() },
      { id: '2', title: 'Live Seminar', content: 'Special lab medicine seminar on Friday 10 AM.', date: new Date().toISOString() },
    ],
    courses: [
      { id: 'laboratory', title: 'DMT in Laboratory Medicine', duration: '3 Years', fee: 'Gratis', description: 'Advanced diagnostic science and laboratory clinical training.' },
      { id: 'radiography', title: 'DMT in Radiography and Imaging', duration: '3 Years', fee: 'Gratis', description: 'Medical imaging technology, X-Ray, and MRI operations.' },
      { id: 'physiotherapy', title: 'DMT in Physiotherapy', duration: '3 Years', fee: 'Gratis', description: 'Rehabilitative medicine and physical therapy technical training.' },
      { id: 'dentistry', title: 'DMT in Dentistry', duration: '3 Years', fee: 'Gratis', description: 'Oral health technical science and dental clinical support.' },
      { id: 'pharmacy', title: 'Diploma In Pharmacy', duration: '3 Years', fee: 'Gratis', description: 'Pharmaceutical science and clinical drug management training.' },
      { id: 'radiotherapy', title: 'DMT in Radiotherapy', duration: '3 Years', fee: 'Gratis', description: 'Cancer treatment support and radiation therapy management.' },
      { id: 'ota', title: 'DMT in Operation Theater Assistant (OTA)', duration: '1 Year', fee: 'Gratis', description: 'Surgical support and OT sterilization technical procedures.' },
      { id: 'ica', title: 'Intensive Care Assistant (ICA)', duration: '1 Year', fee: 'Gratis', description: 'Critical care support and emergency medical technical skills.' },
    ],
    users: [
      { id: 'admin', email: 'xoysharif@gmail.com', password: 'admin123', role: 'admin', name: 'System Administrator' },
      { id: 'teacher1', email: 'teacher@pulsecore.edu', password: 'password', role: 'teacher', name: 'Dr. Sarah Wilson', assignment: 'Anatomy & Physiology' },
      { id: 'teacher2', email: 'teacher2@pulsecore.edu', password: 'password', role: 'teacher', name: 'Prof. Ahmed Kabir', assignment: 'Pathology & Micro' },
      { id: 'student1', email: 'student1@gmail.com', password: 'password', role: 'student', name: 'Kareem Abdulla' },
      { id: 'student2', email: 'student2@gmail.com', password: 'password', role: 'student', name: 'Sara Khan' },
    ],
    institutes: [
      {
        id: 'dhaka-iht',
        name: 'Dhaka Institute of Health Technology',
        location: 'Mohakhali, Dhaka',
        isApproved: true,
        seats: { 
          laboratory: { code: '111', seats: 50 }, 
          radiography: { code: '112', seats: 50 }, 
          physiotherapy: { code: '113', seats: 50 }, 
          dentistry: { code: '114', seats: 50 }, 
          pharmacy: { code: '115', seats: 50 }, 
          radiotherapy: { code: '116', seats: 20 }, 
          ota: { code: '117', seats: 25 }, 
          ica: { code: '118', seats: 25 } 
        },
        description: 'Established in 1963, Dhaka IHT is the oldest and most prestigious medical technology institute in Bangladesh.',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
        gallery: [
          'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1538108197017-c13466739195?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1586771107445-d3ca888129ee?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=800'
        ],
        website: 'http://ihtdhaka.gov.bd',
        phone: '02-9881234',
        email: 'info@ihtdhaka.gov.bd',
        mapEmbed: 'https://www.google.com/maps?q=IHT+Dhaka&output=embed'
      },
      {
        id: 'rajshahi-iht',
        name: 'Rajshahi Institute of Health Technology',
        location: 'Greater Road, Rajshahi',
        isApproved: true,
        seats: { 
          laboratory: { code: '121', seats: 50 }, 
          radiography: { code: '122', seats: 50 }, 
          physiotherapy: { code: '123', seats: 50 }, 
          dentistry: { code: '124', seats: 50 }, 
          pharmacy: { code: '125', seats: 50 }, 
          radiotherapy: { code: '126', seats: 27 } 
        },
        description: 'A leading health technology institute serving the northern region of Bangladesh since 1976.',
        image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ee?auto=format&fit=crop&q=80&w=1200',
        website: 'http://ihtrajshahi.gov.bd'
      },
      {
        id: 'bogura-iht',
        name: 'Bogura Institute of Health Technology',
        location: 'Sherpur Road, Bogura',
        isApproved: true,
        seats: { 
          laboratory: { code: '131', seats: 50 }, 
          radiography: { code: '132', seats: 50 }, 
          physiotherapy: { code: '133', seats: 50 }, 
          dentistry: { code: '134', seats: 50 }, 
          pharmacy: { code: '135', seats: 50 }, 
          radiotherapy: { code: '136', seats: 57 } 
        },
        description: 'High-quality technical education for students in North Bengal.',
        image: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=1200'
      },
      {
        id: 'chattogram-iht',
        name: 'Chattogram Institute of Health Technology',
        location: 'Panchlaish, Chattogram',
        isApproved: true,
        seats: { 
          laboratory: { code: '141', seats: 50 }, 
          radiography: { code: '142', seats: 50 }, 
          physiotherapy: { code: '143', seats: 50 }, 
          dentistry: { code: '144', seats: 50 }, 
          pharmacy: { code: '145', seats: 50 }, 
          radiotherapy: { code: '146', seats: 27 } 
        },
        description: 'The primary medical technology training center for the port city.',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200'
      },
      {
        id: 'barishal-iht',
        name: 'Barishal Institute of Health Technology',
        location: 'Band Road, Barishal',
        isApproved: true,
        seats: { 
          laboratory: { code: '151', seats: 50 }, 
          radiography: { code: '152', seats: 50 }, 
          physiotherapy: { code: '153', seats: 50 }, 
          dentistry: { code: '154', seats: 50 }, 
          pharmacy: { code: '155', seats: 50 }, 
          radiotherapy: { code: '156', seats: 27 } 
        },
        description: 'Serving the southern division of Bangladesh.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200'
      },
      {
        id: 'rangpur-iht',
        name: 'Rangpur Institute of Health Technology',
        location: 'Mahiganj, Rangpur',
        isApproved: true,
        seats: { 
          laboratory: { code: '161', seats: 50 }, 
          radiography: { code: '162', seats: 50 }, 
          physiotherapy: { code: '163', seats: 50 }, 
          dentistry: { code: '164', seats: 50 }, 
          pharmacy: { code: '165', seats: 50 }, 
          radiotherapy: { code: '166', seats: 27 } 
        },
        description: 'Empowering students from Rangpur division.',
        image: 'https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?auto=format&fit=crop&q=80&w=1200'
      },
      {
        id: 'jhenaidah-iht',
        name: 'Jhenaidah Institute of Health Technology',
        location: 'Jhenaidah Town, Jhenaidah',
        isApproved: true,
        seats: { 
          laboratory: { code: '171', seats: 50 }, 
          radiography: { code: '172', seats: 50 }, 
          physiotherapy: { code: '173', seats: 50 }, 
          dentistry: { code: '174', seats: 50 }, 
          pharmacy: { code: '175', seats: 50 }, 
          radiotherapy: { code: '176', seats: 27 } 
        },
        description: 'Technical education center in the Khulna division.',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200'
      },
      {
        id: 'sylhet-iht',
        name: 'Sylhet Institute of Health Technology',
        location: 'Jalalabad, Sylhet',
        isApproved: true,
        seats: { 
          laboratory: { code: '181', seats: 50 }, 
          radiography: { code: '182', seats: 50 }, 
          physiotherapy: { code: '183', seats: 50 }, 
          dentistry: { code: '184', seats: 50 }, 
          pharmacy: { code: '185', seats: 57 } 
        },
        description: 'Providing medical technology expertise in the Sylhet region.',
        image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=1200'
      },
      {
        id: 'sirajgonj-iht',
        name: 'Sirajgonj Institute of Health Technology',
        location: 'Sirajgonj Sadar, Sirajgonj',
        isApproved: true,
        seats: { 
          laboratory: { code: '191', seats: 50 }, 
          pharmacy: { code: '195', seats: 53 } 
        },
        description: 'Technical training hub for students in Sirajgonj.',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200'
      },
      {
        id: 'satkhira-iht',
        name: 'Satkhira Institute of Health Technology',
        location: 'Satkhira Sadar, Satkhira',
        isApproved: true,
        seats: { 
          laboratory: { code: '201', seats: 50 }, 
          radiography: { code: '202', seats: 53 } 
        },
        description: 'Serving the southwestern border district of Satkhira.',
        image: 'https://images.unsplash.com/photo-1538108197017-c13466739195?auto=format&fit=crop&q=80&w=1200'
      },
      {
        id: 'jamalpur-iht',
        name: 'Jamalpur Institute of Health Technology',
        location: 'Jamalpur Sadar, Jamalpur',
        isApproved: true,
        seats: { 
          laboratory: { code: '211', seats: 50 }, 
          radiography: { code: '212', seats: 50 }, 
          dentistry: { code: '214', seats: 50 }, 
          pharmacy: { code: '215', seats: 56 } 
        },
        description: 'Medical technology training in the Mymensingh region.',
        image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ee?auto=format&fit=crop&q=80&w=1200'
      },
      {
        id: 'tungipara-iht',
        name: 'Tungipara IHT (Gopalgonj)',
        location: 'Tungipara, Gopalgonj',
        isApproved: true,
        seats: { 
          laboratory: { code: '221', seats: 50 }, 
          pharmacy: { code: '225', seats: 53 } 
        }
      },
      {
        id: 'gazipur-iht',
        name: 'Gazipur Institute of Health Technology',
        location: 'Gazipur Sadar, Gazipur',
        isApproved: true,
        seats: { 
          laboratory: { code: '231', seats: 50 }, 
          pharmacy: { code: '235', seats: 53 } 
        }
      },
      {
        id: 'joypurhat-iht',
        name: 'Joypurhat Institute of Health Technology',
        location: 'Joypurhat Sadar, Joypurhat',
        isApproved: true,
        seats: { 
          laboratory: { code: '251', seats: 50 }, 
          pharmacy: { code: '255', seats: 53 } 
        }
      },
      {
        id: 'madaripur-iht',
        name: 'Madaripur Institute of Health Technology',
        location: 'Madaripur Sadar, Madaripur',
        isApproved: true,
        seats: { 
          laboratory: { code: '261', seats: 50 }, 
          radiography: { code: '262', seats: 50 }, 
          pharmacy: { code: '265', seats: 55 } 
        }
      },
      {
        id: 'manikganj-iht',
        name: 'Manikganj Institute of Health Technology',
        location: 'Manikganj Sadar, Manikganj',
        isApproved: true,
        seats: { 
          laboratory: { code: '271', seats: 26 }, 
          radiography: { code: '272', seats: 26 } 
        }
      },
      {
        id: 'munshiganj-iht',
        name: 'Munshiganj Institute of Health Technology',
        location: 'Munshiganj Sadar, Munshiganj',
        isApproved: true,
        seats: { 
          laboratory: { code: '281', seats: 26 }, 
          radiography: { code: '282', seats: 26 } 
        }
      },
      {
        id: 'noakhali-iht',
        name: 'Noakhali Institute of Health Technology',
        location: 'Maijdee, Noakhali',
        isApproved: true,
        seats: { 
          laboratory: { code: '291', seats: 26 }, 
          radiography: { code: '292', seats: 26 } 
        }
      },
      {
        id: 'naogaon-iht',
        name: 'Naogaon Institute of Health Technology',
        location: 'Naogaon Sadar, Naogaon',
        isApproved: true,
        seats: { 
          laboratory: { code: '301', seats: 26 }, 
          radiography: { code: '302', seats: 26 } 
        }
      },
      {
        id: 'kurigram-iht',
        name: 'Kurigram Institute of Health Technology',
        location: 'Kurigram Sadar, Kurigram',
        isApproved: true,
        seats: { 
          laboratory: { code: '311', seats: 26 }, 
          radiography: { code: '312', seats: 26 } 
        }
      },
      {
        id: 'mymensingh-iht',
        name: 'Mymensingh Institute of Health Technology',
        location: 'Mymensingh Sadar, Mymensingh',
        isApproved: true,
        seats: { 
          laboratory: { code: '321', seats: 26 }, 
          radiography: { code: '322', seats: 26 } 
        }
      },
      {
        id: 'shibchor-iht',
        name: 'Shibchor Institute of Health Technology',
        location: 'Shibchor, Madaripur',
        isApproved: true,
        seats: { 
          laboratory: { code: '331', seats: 26 }, 
          radiography: { code: '332', seats: 26 } 
        }
      },
      {
        id: 'lalmonirhat-iht',
        name: 'Lalmonirhat Institute of Health Technology',
        location: 'Sadar, Lalmonirhat',
        isApproved: true,
        seats: { 
          laboratory: { code: '341', seats: 26 }, 
          pharmacy: { code: '345', seats: 26 } 
        }
      }
    ],
    about: {
      ownerName: 'MD SHARIF ISLAM JOY',
      designation: 'Founder & Academic Director',
      qualification: 'On-going students, DMT in health Technology(ICA), BSc in Health Technology (DU)',
      bio: 'Leading the frontier of medical technical education for over a decade. Our mission is to produce world-class clinical technicians for Bangladesh.',
      vision: 'To harmonize technological precision with humanitarian medical care.',
      phone: '01819248542',
      email: 'xoysharif@gmail.com',
      photoUrl: '/src/assets/images/regenerated_image_1777971748339.jpg',
    },
    exams: [
      {
        id: 'exam-1',
        title: 'Mid-term Assessment: Anatomy',
        courseId: 'laboratory',
        durationMinutes: 30,
        totalMarks: 50,
        status: 'active',
        createdAt: new Date().toISOString(),
        questions: [
          { id: 'q1', text: 'What is the largest organ in the human body?', options: ['Liver', 'Brain', 'Skin', 'Heart'], correctOptionIndex: 2 },
          { id: 'q2', text: 'How many bones are in the adult human body?', options: ['206', '208', '210', '212'], correctOptionIndex: 0 },
          { id: 'q3', text: 'Which blood type is the universal donor?', options: ['A', 'B', 'AB', 'O'], correctOptionIndex: 3 },
          { id: 'q4', text: 'What is the main function of red blood cells?', options: ['Fight infection', 'Carry oxygen', 'Clot blood', 'Digest food'], correctOptionIndex: 1 },
          { id: 'q5', text: 'Where is the femur located?', options: ['Arm', 'Leg', 'Back', 'Hip'], correctOptionIndex: 1 },
        ]
      }
    ],
    examResults: []
  };

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/institutes', (req, res) => {
    res.json(db.institutes);
  });

  app.post('/api/institutes', (req, res) => {
    const institute = { id: Date.now().toString(), ...req.body };
    db.institutes.push(institute);
    res.status(201).json(institute);
  });

  app.put('/api/institutes/:id', (req, res) => {
    const { id } = req.params;
    const index = db.institutes.findIndex(i => i.id === id);
    if (index !== -1) {
      db.institutes[index] = { ...db.institutes[index], ...req.body };
      res.json(db.institutes[index]);
    } else {
      res.status(404).json({ message: 'Institute not found' });
    }
  });

  app.delete('/api/institutes/:id', (req, res) => {
    const { id } = req.params;
    db.institutes = db.institutes.filter(i => i.id !== id);
    res.status(204).end();
  });

  app.get('/api/courses', (req, res) => {
    res.json(db.courses);
  });

  app.post('/api/courses', (req, res) => {
    const course = { id: Date.now().toString(), ...req.body };
    db.courses.push(course);
    res.status(201).json(course);
  });

  app.put('/api/courses/:id', (req, res) => {
    const { id } = req.params;
    const index = db.courses.findIndex(c => c.id === id);
    if (index !== -1) {
      db.courses[index] = { ...db.courses[index], ...req.body };
      res.json(db.courses[index]);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });

  app.delete('/api/courses/:id', (req, res) => {
    const { id } = req.params;
    db.courses = db.courses.filter(c => c.id !== id);
    res.status(204).end();
  });

  app.get('/api/admin/teachers', (req, res) => {
    const teachers = db.users.filter(u => u.role === 'teacher');
    res.json(teachers);
  });

  app.post('/api/admin/teachers', (req, res) => {
    const teacher = { id: Date.now().toString(), ...req.body, role: 'teacher' };
    db.users.push(teacher);
    res.status(201).json(teacher);
  });

  app.put('/api/admin/teachers/:id', (req, res) => {
    const { id } = req.params;
    const index = db.users.findIndex(u => u.id === id);
    if (index !== -1 && db.users[index].role === 'teacher') {
      db.users[index] = { ...db.users[index], ...req.body };
      res.json(db.users[index]);
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  });

  app.delete('/api/admin/teachers/:id', (req, res) => {
    const { id } = req.params;
    db.users = db.users.filter(u => u.id !== id);
    res.status(204).end();
  });

  app.get('/api/student/admission-status', (req, res) => {
    const { email } = req.query;
    // For demo, we search by name or logic
    const admission = db.admissions.find((a: any) => 
      a.phone === '01711122233' && email === 'student1@gmail.com' ||
      a.phone === '01811122233' && email === 'student2@gmail.com'
    );
    res.json(admission || null);
  });

  app.get('/api/notices', (req, res) => {
    res.json(db.notices);
  });

  app.post('/api/notices', (req, res) => {
    const notice = { id: Date.now().toString(), date: new Date().toISOString(), ...req.body };
    db.notices.unshift(notice); // Latest first
    res.status(201).json(notice);
  });

  app.delete('/api/notices/:id', (req, res) => {
    const { id } = req.params;
    db.notices = db.notices.filter(n => n.id !== id);
    res.status(204).end();
  });

  app.post('/api/admissions', (req, res) => {
    const admission = { id: Date.now().toString(), ...req.body, status: 'pending' };
    db.admissions.push(admission);
    res.status(201).json(admission);
  });

  app.get('/api/admin/admissions', (req, res) => {
    res.json(db.admissions);
  });

  app.patch('/api/admin/admissions/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const admission: any = db.admissions.find((a: any) => a.id === id);
    if (admission) {
      admission.status = status;
      res.json(admission);
    } else {
      res.status(404).json({ message: 'Admission not found' });
    }
  });

  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = db.users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

  app.post('/api/auth/signup', (req, res) => {
    const { email, password, name } = req.body;
    if (db.users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      role: 'student' as const
    };
    db.users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  });

  app.get('/api/about', (req, res) => {
    res.json(db.about);
  });

  app.put('/api/about', (req, res) => {
    db.about = { ...db.about, ...req.body };
    res.json(db.about);
  });

  app.get('/api/exams', (req, res) => {
    const activeExams = (db as any).exams.filter((e: any) => e.status === 'active');
    res.json(activeExams);
  });

  app.post('/api/exams', (req, res) => {
    const exam = { id: Date.now().toString(), createdAt: new Date().toISOString(), ...req.body };
    (db as any).exams.push(exam);
    res.status(201).json(exam);
  });

  app.post('/api/exams/results', (req, res) => {
    const result = { id: Date.now().toString(), submittedAt: new Date().toISOString(), ...req.body };
    (db as any).examResults.push(result);
    res.status(201).json(result);
  });

  app.get('/api/exams/results', (req, res) => {
    const { email } = req.query;
    const results = (db as any).examResults.filter((r: any) => r.userEmail === email);
    res.json(results);
  });

  app.get('/api/admin/exam-results', (req, res) => {
    res.json((db as any).examResults);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
