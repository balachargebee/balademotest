# Chargebee Subscription Saas Starter

A Chargebee focused T3 Stack that integrates User Subscriptions, Authentication and Testing. Driven by Prisma ORM. Deploys to Vercel

## The Week Demo

Configure this project as a self-service demo for **The Week** magazine.
Set `CHARGEBEE_ITEM_FAMILY_ID` in your `.env` file to the item family
containing the **Print** and **Digital** plans. Then run `npm run seed`
to fetch the plans from Chargebee and populate the local database.

## Features

- Full stack typesafety with t3-stack.
- Database ORM with Prisma.
- Automatic deployment to Vercel
- Styling with Tailwind.css + Tailwind Prettier-Plugin.
- Linting with ESLint.
- Code formatting with Prettier.
- Out of the box Authenticaton.

## Demo

[https://chargebee-saas-stack.vercel.app/](https://chargebee-saas-stack.vercel.app/)

[![Screenshot of demo](./public/demo.png)](https://chargebee-saas-stack.vercel.app/)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for more information.

## Credits

Inspired from [Vercel Subscription Template](https://github.com/vercel/nextjs-subscription-payments)
