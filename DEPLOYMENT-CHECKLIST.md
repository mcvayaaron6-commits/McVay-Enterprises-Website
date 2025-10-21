# McVay Enterprises - Deployment Checklist

## 🚀 **PRE-DEPLOYMENT SETUP (Complete Before Going Live)**

### **1. Calendly Configuration (CRITICAL)**
- [ ] Create Calendly account at calendly.com
- [ ] Set up username: **aaron-mcvay** (or update URLs in code)
- [ ] Create event type: **"AI Strategy Consultation"**
  - Duration: 30 minutes
  - Buffer time: 15 minutes before/after
  - Description: "Free strategic consultation on AI implementation for your organization"
- [ ] Configure availability (recommend: Mon-Fri, 9 AM - 5 PM your timezone)
- [ ] Update Calendly URL in `js/main.js` (lines 369 and 384):
  ```javascript
  const calendlyUrl = 'https://calendly.com/aaron-mcvay/ai-consultation';
  ```

### **2. Email Integration Setup**
- [ ] Configure contact form backend to send emails to aaron@mcvayenterprises.com
- [ ] Set up Calendly webhook to notify on new bookings
- [ ] Test email deliverability for both newsletter and booking confirmations
- [ ] Configure automated email responses for form submissions

### **3. Analytics and Tracking**
- [ ] Install Google Analytics 4 code
- [ ] Set up conversion tracking for:
  - Newsletter signups
  - Consultation bookings  
  - Form submissions
- [ ] Configure Google Search Console
- [ ] Add Facebook Pixel (if using social advertising)

---

## 🌐 **DEPLOYMENT OPTIONS (Choose One)**

### **Option A: Netlify (Recommended - Easiest)**
1. **Upload Method**: 
   - Drag and drop project folder to netlify.com
   - Or connect GitHub repository for auto-deployment

2. **Domain Configuration**:
   - Add custom domain: mcvayenterprises.com
   - Configure DNS: Point A record to Netlify's IP
   - Enable HTTPS (automatic with Netlify)

3. **Form Handling**:
   - Netlify automatically handles forms
   - Configure form notifications to aaron@mcvayenterprises.com

### **Option B: Vercel (Performance Focused)**
1. **Deploy**: Import project from GitHub to vercel.com
2. **Domain**: Add mcvayenterprises.com in project settings
3. **Forms**: Use Vercel's serverless functions for form processing

### **Option C: Traditional Hosting (cPanel/FTP)**
1. **Upload**: FTP all files to public_html directory
2. **Domain**: Point DNS to hosting server
3. **Forms**: Requires PHP backend for form processing

---

## ✅ **POST-DEPLOYMENT TESTING (Complete After Going Live)**

### **Critical Functionality Tests**
- [ ] **Homepage loads** in under 3 seconds
- [ ] **Navigation works** - all menu links scroll to correct sections
- [ ] **Mobile responsiveness** - test on phone and tablet
- [ ] **Newsletter signup** - complete flow and verify email receipt
- [ ] **Booking modal opens** from all CTA buttons
- [ ] **Calendly widget loads** in consultation section
- [ ] **Contact forms submit** successfully
- [ ] **All images display** correctly (especially logo)

### **Cross-Browser Testing**
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile) 
- [ ] Firefox
- [ ] Edge

### **Performance Verification**
- [ ] Google PageSpeed Insights score 90+ 
- [ ] GTmetrix performance grade A
- [ ] Mobile usability test passes
- [ ] All CSS and JS files load without errors

---

## 📈 **IMMEDIATE LAUNCH STRATEGY**

### **Day 1: Go Live**
- [ ] Deploy website to mcvayenterprises.com
- [ ] Test all functionality end-to-end
- [ ] Share launch announcement on LinkedIn
- [ ] Email existing contacts about new website

### **Week 1: Content & SEO Foundation**
- [ ] Publish 3 high-value blog posts about AI/LLM trends
- [ ] Submit sitemap to Google Search Console
- [ ] Create LinkedIn company page
- [ ] Set up Google My Business profile

### **Week 2: Lead Generation Activation**
- [ ] Launch LinkedIn content strategy (daily AI insights)
- [ ] Create downloadable "AI ROI Calculator" lead magnet
- [ ] Start email nurture sequence for newsletter subscribers
- [ ] Begin outreach to potential speaking opportunities

### **Month 1: Growth & Optimization**
- [ ] A/B test newsletter modal timing (30s vs 60s)
- [ ] Add testimonials from initial consultations
- [ ] Create video introduction for consultation page
- [ ] Launch referral program for existing clients

---

## 🎯 **SUCCESS METRICS TO MONITOR**

### **Weekly KPIs**
- Website visitors (target: 100+ per week initially)
- Newsletter signups (target: 5% conversion rate)
- Consultation bookings (target: 2-3 per week)
- Email open rates (target: 25%+)

### **Monthly Business Goals**
- Qualified consultations: 10+ per month
- Converted projects: 3-4 per month (30% conversion)
- Average project value: $25K+ initially, scaling to $100K+
- Newsletter subscribers: 500+ within 6 months

---

## 🚨 **TROUBLESHOOTING GUIDE**

### **Common Issues & Solutions**

**Calendly Widget Not Loading:**
- Check internet connection and Calendly service status
- Verify Calendly URL is correct in JavaScript
- Fallback: Forms will display automatically if Calendly fails

**Forms Not Sending Emails:**
- Verify email backend configuration
- Check spam folders for test emails
- Ensure SMTP settings are correct

**Mobile Layout Issues:**
- Clear browser cache
- Test on actual devices, not just browser resize
- Check Tailwind CSS responsive classes

**Slow Page Load:**
- Optimize images (compress to under 100KB each)
- Enable CDN through hosting provider
- Minify CSS and JavaScript files

---

## 📞 **POST-LAUNCH SUPPORT CONTACTS**

### **Technical Issues**
- Hosting support through chosen provider (Netlify/Vercel)
- Domain issues: Contact domain registrar support

### **Calendly Configuration**
- Calendly Help Center: help.calendly.com
- Direct support through Calendly account

### **Email Deliverability**
- Check with hosting provider email settings
- Consider using SendGrid or Mailchimp for reliable delivery

---

## 🎉 **LAUNCH DAY CHECKLIST**

**2 Hours Before Launch:**
- [ ] Final backup of all website files
- [ ] Clear browser cache and test locally
- [ ] Prepare social media launch posts
- [ ] Draft email to existing contacts

**Go-Live Process:**
- [ ] Deploy to production domain
- [ ] Test every page and form
- [ ] Verify SSL certificate is active
- [ ] Submit to search engines

**Immediately After Launch:**
- [ ] Post LinkedIn announcement
- [ ] Send launch email to contacts
- [ ] Monitor analytics for first visitor data
- [ ] Celebrate! 🎊

---

*This checklist ensures your McVay Enterprises website launches flawlessly and immediately begins generating high-quality leads and consultation bookings.*