# On Easy - Indian Salary Calculator & Payroll Management

A full-stack Indian payroll management application built with Next.js. Computes accurate salary breakdowns from CTC, generates professional payslips, manages employees, and provides tax and compensation analysis tools.

## Features

### Core Payroll
- **Salary Calculator** - Compute complete salary structure from Annual CTC with earnings, deductions, and employer contributions
- **Payslip Generator** - Generate professional HTML payslips with company logo upload, print, and PDF download
- **Payslip History** - Track all generated payslips with view, edit, regenerate, and delete capabilities
- **Bulk Payslip Generation** - Generate payslips for multiple employees at once

### Employee Management
- **Employee Directory** - Full CRUD operations for managing employee records
- **Department Organization** - Track employees by department, designation, and CTC

### Analysis & Comparison
- **CTC Comparison** - Side-by-side comparison of two CTC packages with hike percentage and delta analysis
- **Tax Regime Comparison** - Old vs New Indian tax regime comparison with recommendations
- **Salary Revision Simulator** - Simulate salary increments with multi-scenario projection tables

### Dashboard & Reporting
- **Summary Dashboard** - KPI cards, salary breakdown charts, recent activity, department distribution
- **Monthly Payroll Overview** - Aggregate payroll metrics across all employees
- **Calculation History** - Persistent log of all salary calculations with Supabase storage

### Indian Payroll Compliance
- **Multi-State Professional Tax** - PT slab support for 18 Indian states (Maharashtra, Karnataka, Tamil Nadu, West Bengal, Andhra Pradesh, Telangana, Gujarat, Kerala, Madhya Pradesh, Odisha, Assam, Meghalaya, Tripura, Jharkhand, Bihar, Manipur, Mizoram, Sikkim)
- **EPF Calculation** - Employee and employer EPF contributions (12% on basic, capped at 15,000 wage ceiling)
- **ESI Calculation** - Employee (0.75%) and employer (3.25%) ESI with 21,000/month threshold
- **Pro-rata Payslip** - Automatic pro-rating when days worked differ from standard days

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.2 |
| Language | TypeScript | 5.x |
| UI | React | 19.2.4 |
| Styling | Tailwind CSS | 4.x |
| Database | Supabase (PostgreSQL) | 2.101.1 |
| Auth | Supabase Auth | 2.101.1 |
| Fonts | DM Sans + JetBrains Mono | Google Fonts |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── batch/route.ts          # Batch salary calculations
│   │   ├── calculate/route.ts      # Single salary calculation
│   │   ├── compare/route.ts        # CTC comparison endpoint
│   │   ├── employees/route.ts      # Employee CRUD (GET/POST/PUT/DELETE)
│   │   ├── health/route.ts         # Health check
│   │   ├── history/route.ts        # Calculation history (GET)
│   │   ├── payslip/
│   │   │   ├── route.ts            # Payslip generation
│   │   │   └── bulk/route.ts       # Bulk payslip generation
│   │   ├── statutory/route.ts      # Statutory info endpoint
│   │   └── tax-compare/route.ts    # Tax regime comparison
│   ├── globals.css                 # Global styles & design tokens
│   ├── layout.tsx                  # Root layout with fonts & auth
│   └── page.tsx                    # Login page / entry point
│
├── components/
│   ├── HomeContent.tsx             # Main layout with sidebar navigation
│   ├── SalaryCalculatorPanel.tsx   # CTC salary calculator form
│   ├── SalaryBreakdownCard.tsx     # Earnings/deductions display card
│   ├── PayslipGenerator.tsx        # Payslip form with logo upload & PDF
│   ├── PayslipHistoryPanel.tsx     # Payslip history table with CRUD
│   ├── DashboardPanel.tsx          # KPI dashboard with charts
│   ├── EmployeeDirectory.tsx       # Employee management table
│   ├── CTCComparePanel.tsx         # Side-by-side CTC comparison
│   ├── TaxComparePanel.tsx         # Old vs New tax regime analysis
│   ├── RevisionSimulator.tsx       # Salary revision projections
│   └── HistoryPanel.tsx            # Calculation history table
│
└── lib/
    ├── api.ts                      # API client, types & format helpers
    ├── payslip-history.ts          # localStorage-backed payslip store
    ├── auth/
    │   └── AuthContext.tsx          # Supabase auth context provider
    ├── engine/
    │   ├── salary-calculator.ts    # Core salary computation engine
    │   ├── statutory.ts            # EPF, ESI, PT slabs & tax regimes
    │   └── payslip-generator.ts    # HTML payslip template renderer
    └── services/
        ├── database.ts             # Supabase DB persistence layer
        ├── helpers.ts              # Shared utility functions
        ├── supabase.ts             # Server-side Supabase client
        └── supabase-browser.ts     # Client-side Supabase client
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm
- Supabase account (optional - app works without it using graceful fallbacks)

### Installation

```bash
# Clone the repository
git clone https://github.com/Mani5266/Salary-Calculation-.git
cd Salary-Calculation-

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase (optional - app functions without these)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> The app works fully without Supabase - salary calculations, payslip generation, CTC comparison, and tax analysis all run client/server-side with no external dependencies. Supabase adds persistent storage for employees, calculation history, and authentication.

### Supabase Tables (Optional)

If using Supabase, create these tables:

```sql
-- Salary calculations history
CREATE TABLE salary_calculations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  annual_ctc NUMERIC NOT NULL,
  monthly_ctc NUMERIC,
  state TEXT DEFAULT 'default',
  basic NUMERIC, hra NUMERIC, conveyance NUMERIC, medical NUMERIC,
  children_education NUMERIC, children_hostel NUMERIC,
  special_allowance NUMERIC, lta NUMERIC, differential_allowance NUMERIC,
  total_earnings NUMERIC,
  employee_epf NUMERIC, employee_esi NUMERIC, professional_tax NUMERIC,
  total_deductions NUMERIC,
  employer_epf NUMERIC, employer_esi NUMERIC,
  net_salary_monthly NUMERIC, net_salary_annual NUMERIC,
  esi_eligible BOOLEAN DEFAULT FALSE,
  employee_name TEXT,
  calculation_type TEXT DEFAULT 'standard',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Employee directory
CREATE TABLE employees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  employee_code TEXT,
  designation TEXT,
  department TEXT,
  date_of_joining TEXT,
  annual_ctc NUMERIC NOT NULL,
  state TEXT DEFAULT 'default',
  gender TEXT DEFAULT 'Male',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Running the App

```bash
# Development server
npm run dev

# Production build
npm run build
npm start
```

The app runs on `http://localhost:3000` by default.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/calculate` | Calculate salary breakdown from annual CTC |
| POST | `/api/payslip` | Generate a single payslip (HTML) |
| POST | `/api/payslip/bulk` | Generate payslips for multiple employees |
| POST | `/api/compare` | Compare two CTC packages |
| POST | `/api/tax-compare` | Compare Old vs New tax regimes |
| GET | `/api/history` | Fetch calculation history |
| GET/POST/PUT/DELETE | `/api/employees` | Employee CRUD operations |
| POST | `/api/batch` | Batch salary calculations |
| GET | `/api/statutory` | Get statutory compliance info |
| GET | `/api/health` | Health check |

## Salary Calculation Logic

The salary engine breaks down Annual CTC into the following components:

### Earnings
| Component | Rule |
|-----------|------|
| Basic Pay | ~50% of monthly CTC (adjusted for EPF/ESI) |
| HRA | 40% of Basic |
| Conveyance Allowance | Fixed 1,600/month |
| Medical Allowance | Fixed 1,250/month (if CTC allows) |
| Children Education | Fixed 200/child x 2 = 400/month |
| Children Hostel | Fixed 300/child x 2 = 600/month |
| Special Allowance | Residual after fixed allocations |
| LTA | Derived from structure |
| Differential Allowance | Balance adjustment |

### Deductions
| Component | Rule |
|-----------|------|
| Employee EPF | 12% of Basic (capped at 15,000 wage ceiling) |
| Employee ESI | 0.75% of gross (only if monthly CTC <= 21,000) |
| Professional Tax | State-specific slabs (18 states supported) |

### Employer Contributions
| Component | Rule |
|-----------|------|
| Employer EPF | 12% of Basic (capped at 15,000 wage ceiling) |
| Employer ESI | 3.25% of gross (only if monthly CTC <= 21,000) |

## Design System

- **Theme**: Clean white/light surfaces with blue accent (`#2563EB`)
- **Typography**: DM Sans (body text) + JetBrains Mono (numbers & data)
- **Components**: Custom card, stat-card, badge, button, input, and table styles
- **Layout**: Fixed sidebar (240px) + scrollable main content area

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set environment variables in the Vercel dashboard.

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## License

This project is private and proprietary.
