# 🎯 Digital Media Selection Framework

**Bachelor Thesis Study - Georg-August-Universität Göttingen**

A comprehensive decision tree application for evaluating digital media selection frameworks in educational contexts, featuring advanced participation control and GDPR-compliant data collection.

## 🚀 Quick Deployment Guide

### 1. **Supabase Setup**
Execute this SQL in your Supabase SQL Editor:
```sql
-- Run tokens-table.sql to create the token system
```

### 2. **Netlify Deployment** 
1. Fork this repository to your GitHub
2. Connect to Netlify via Git integration
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Set environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

### 3. **Expected Result**
- ✅ **2 functions deployed** (generate-token, submit-survey)
- ✅ **Token system active** with rate limiting
- ✅ **Voucher lottery ready**

## 🎟️ Token-Based Participation System
- UUID-based tokens for unique participation
- 24-hour validity with automatic expiry
- Rate limiting (1 token/5min per IP)
- Prevents multiple participation

## 📊 Survey Features
- System Usability Scale (SUS) - 10 questions
- 5 Likert-scale questions
- 3 open-ended questions
- Multi-language (DE/EN)

## 🔐 GDPR Compliance
- Age confirmation (18+)
- Granular consent management
- Separated data storage
- University of Göttingen compliant

---

**🎓 Ready for Bachelor Thesis Study**
