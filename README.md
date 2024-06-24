This was the project for my application for a summer internship. It consisted of creating a web shop application. Under the hood I used Next, Zustand, Tailwind, UploadThing and all of it is looking nice thanks to Shadcn's UI components, and it is all mobile frendly. It took me around two days to finish, with database taking up most of my time.

As far as structure goes, I've colocated any single-use components and actions I've used next to their respective page.tsx-es since Next.js 13 allows that, otherwise everything else is under components. Shadcn's UI components are under components/ui and they serve as the most basic components I've used.

The data is stored in postgres, I am using Neon.tech as a provider here. UploadThing was used for file uploads.

Running it is simple but I didn't include .env here:
```
  npm run dev
```

![Front page](https://github.com/PetarPoP/agiloProjekat/assets/47577541/ec03d0c5-a1b3-4880-97d2-978035bd406f)
Front page

![Product page](https://github.com/PetarPoP/agiloProjekat/assets/47577541/f0f4405f-37af-440b-9d74-fdf6b3b96da5)
Product page

![Cart](https://github.com/PetarPoP/agiloProjekat/assets/47577541/566c4bc2-ad54-457b-97c5-3e1d6cb6a74d)
Cart

![Admin page](https://github.com/PetarPoP/agiloProjekat/assets/47577541/0195955b-3b44-4776-9568-3933553ce6fb)
Admin page
