# Faith Commerce Launch Checklist

Updated for the product-first McVay Enterprises site.

## ✅ Pre-Launch Configuration

1. **Email Routing**
   - Update the FormSubmit endpoints in `main.js` if you prefer different inboxes for newsletter (`hello@…`) and orders (`orders@…`).
   - Send a test submission for both forms and confirm receipt.

2. **ChatGPT Assistant**
   - Publish the Faith Commerce Assistant GPT (see `resources/faith-commerce-assistant-setup.html`).
   - Replace `config.chatgptStoreUrl` with the GPT share link.
   - Test each “ChatGPT Assistant” button on desktop and mobile.

3. **Product Data**
   - Review pricing, profit targets, and supplier notes in the `products` array.
   - Update product sheet content if margins or suppliers change.
   - Swap images or copy in the resource docs as needed.

4. **Brand Assets**
   - Replace footer social links with official profiles.
   - Verify `mcvay-logo.png` is the current brand mark.
   - Generate OG image if sharing on social platforms.

## 🌐 Deployment Steps

### Option A – Netlify (Recommended)
1. Drag-and-drop the repo or connect GitHub.
2. Add custom domain `mcvayenterprises.com` and enable HTTPS.
3. In Site Settings → Forms, configure notifications for both form endpoints.

### Option B – Vercel / Static Hosting
1. Upload the project or connect GitHub.
2. Ensure CORS allows requests to FormSubmit (or replace with Vercel functions).
3. Configure domain + SSL.

## 🔍 Post-Deployment QA

- Load the homepage on desktop and mobile (Chrome, Safari, Firefox).
- Add multiple items to the cart, open the checkout form, and verify the summary.
- Submit a real order request and confirm the email includes itemized cart data.
- Complete a newsletter signup and verify the success toast + inbox.
- Open each resource link to ensure the documents render correctly.
- Confirm cart state persists across refresh and incognito sessions.

## 🚀 Launch Week Plan

- **Day 1:** Publish launch announcement (email, LinkedIn, TikTok) and include the GPT link.
- **Day 2:** Record 3 TikTok/Reel clips featuring bracelets, tees, and wall art.
- **Day 3:** Outreach to 10 churches/youth ministries using the partnership kit.
- **Day 4:** Run a live demo of the Faith Commerce Assistant GPT.
- **Day 5:** Send the first “Faith Commerce Finds” newsletter with product drop schedule.

## 📈 Metrics to Monitor

- Daily revenue & contribution margin (target $400+ in week 1).
- Cart-to-checkout request conversion rate (goal 18%+).
- Newsletter subscriber growth (goal 200 new/week after week 2).
- ChatGPT-assisted orders vs. direct website orders.
- Supplier fulfillment speed (bracelet SLA & POD processing).

## 🆘 Support Playbook

- If FormSubmit fails, swap to Netlify Forms or your ESP form endpoint.
- If AutoDS delays >24h, trigger manual order from supplier dashboard.
- Log bugs or copy tweaks in the Notion HQ template referenced in `resources/kpi-dashboard.html`.

Stay consistent with daily content (minimum 3 posts) and weekly live sessions to keep the pipeline full.
