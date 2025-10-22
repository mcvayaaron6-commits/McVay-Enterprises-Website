# McVay Enterprises • Faith Commerce Launchpad

This repository contains the production-ready marketing site for McVay Enterprises’ faith-commerce initiative. The site highlights the top-performing Christian merchandise, collects orders through a Shopify-ready checkout request flow, and links to the Faith Commerce Assistant GPT so customers can buy directly inside ChatGPT.

## ✨ Key Features

- **Product-first landing page** featuring six proven SKUs with conversion metrics, product sheets, and bundle playbooks.
- **High-impact product visuals** – each featured SKU includes optimized imagery and performance tags to elevate conversion confidence.
- **Cart & order request workflow** that captures customer details and emails a summary to aaron@mcvayenterprises.com via [FormSubmit](https://formsubmit.co). Draft Shopify checkout links can be sent manually or through the GPT action.
- **ChatGPT integration hooks** – all “ChatGPT Assistant” buttons open the deployment guide for the Faith Commerce Assistant GPT. Update `config.chatgptStoreUrl` in `main.js` with your published GPT link to go live.
- **Resource library** with automation SOPs, supplier lists, KPI dashboards, creative prompts, training schedules, and partnership kits.
- **Dynamic proof & FAQ sections** powered by `main.js`, highlighting real launch wins and answering the top operational questions.
- **Persistent local storage** for cart state and newsletter opt-in so returning visitors pick up where they left off.
- **Live Zoom strategy session CTA** highlighting the personal meeting room details for weekly faith-commerce calls.

## 🔧 Remaining Setup To Go Live

Before sharing the site publicly, complete these final tasks:

1. **Point the forms to your live inbox.** Confirm the newsletter and checkout request submissions reach `aaron@mcvayenterprises.com`, or update the FormSubmit endpoints in `main.js` if you need separate workflows.
2. **Publish and link the Faith Commerce Assistant GPT.** Follow the checklist in `resources/faith-commerce-assistant-setup.html`, then replace `config.chatgptStoreUrl` in `main.js` so every CTA opens the live assistant.
3. **Validate product and bundle data.** Re-check pricing, supplier notes, and imagery for each SKU in `main.js`, and refresh the supporting product sheets in `resources/products/` if offers changed.
4. **Refresh proof, FAQ, and resource content.** Update testimonials, FAQs, and resource links so all claims, metrics, and downloads match your current launch plan.
5. **Verify live session logistics.** Make sure the Zoom URL, meeting ID, and passcode in `index.html` match your active room and that the calendar invite opens correctly.
6. **Run the post-deployment QA pass.** Test cart persistence, form submissions, resource downloads, and ChatGPT links on both desktop and mobile before announcing the site.

## 🛠️ Configuration

1. **Newsletter & Order Endpoints**
   `main.js` posts to a single FormSubmit address (`aaron@mcvayenterprises.com`) for both newsletter opt-ins and checkout requests. Replace this email if you want submissions delivered elsewhere or split by workflow.

2. **ChatGPT Store Link**  
   After publishing the Faith Commerce Assistant GPT, update:
   ```js
   const config = {
       chatgptStoreUrl: 'https://chat.openai.com/g/your-assistant-slug'
   };
   ```

3. **Product Data**
   Edit the `products` array in `main.js` to adjust pricing, descriptions, tags, or links to new product sheets located in `resources/products/`.

4. **Social Proof & FAQ Copy**
   Update the `testimonials` and `faqs` arrays in `main.js` with the latest client wins, metrics, and support answers.

5. **Bundles & Resources**
   Bundle CTAs link to anchors in `resources/bundle-playbooks.html`. Modify the file (or add new sections) to support additional drops.

6. **Live Session Details**
   Update the Zoom URL, meeting ID, and passcode in the "Live Session" section of `index.html` if Aaron’s personal meeting room changes.

## 🚀 Local Development

This is a static site – open `index.html` in your browser or serve with any static server:
```bash
npx serve .
```
No build tools are required.

## 📦 Deployment

- **Netlify**: Drag-and-drop the repo folder or connect the Git repository. Netlify Forms will automatically capture submissions if you prefer that over FormSubmit.
- **Vercel / Static Hosting**: Upload the files directly. Ensure CORS is permitted for FormSubmit or swap to your preferred form backend.
- **Custom Domain**: Point `mcvayenterprises.com` to the hosting provider and enable HTTPS.

## ✅ Post-Deployment Checklist

- Update email recipients inside `main.js` and test newsletter + order flows.
- Confirm the ChatGPT buttons open your live GPT or storefront.
- Submit an order request and verify you receive the confirmation email with the cart summary.
- Replace placeholder social links in the footer if you have official profiles.
- Review each resource document and localize for your team if needed.

## 🧭 Repository Structure

```
├── index.html                # Landing page
├── style.css                 # Tailwind-inspired custom styles
├── main.js                   # Product data, cart, forms, and interactions
├── resources/                # Downloadable SOPs, product sheets, GPT guide
│   ├── bundle-playbooks.html
│   ├── faith-commerce-assistant-setup.html
│   ├── products/
│   └── …
├── DEPLOYMENT-CHECKLIST.md   # Go-live and growth plan (updated for product-first focus)
└── mcvay-logo.png
```

## 📬 Support

For implementation help or partnership inquiries, email [aaron@mcvayenterprises.com](mailto:aaron@mcvayenterprises.com).
