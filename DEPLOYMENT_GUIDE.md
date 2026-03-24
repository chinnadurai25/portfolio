# How to Deploy Your Portfolio

Your portfolio is built and ready! Here are the easiest ways to publish it online for free.

## Option 1: Vercel (Recommended)
Vercel is arguably the best place for React apps.

1.  **Open your terminal** (in VS Code or PowerShell).
2.  Run the following command:
    ```bash
    npx vercel
    ```
3.  Follow the prompts:
    *   **Set up and deploy?** [Y]
    *   **Which scope?** [Select your account]
    *   **Link to existing project?** [N]
    *   **Project Name?** [portfolio] (or type `chinnadurai-portfolio`)
    *   **In which directory?** [./] (Just press Enter)
    *   **Want to modify settings?** [N] (Defaults are fine)

4.  Wait a minute, and it will give you a **Production** link (e.g., `https://chinnadurai-portfolio.vercel.app`).
5.  **Done!** share that link on LinkedIn.

## Option 2: Netlify (Drag & Drop)
If you don't want to use the command line:

1.  Go to the `d:\new\portfolio` folder in your File Explorer.
2.  You will see a `build` folder (created by the build process we just updated).
3.  Go to [Netlify Drop](https://app.netlify.com/drop).
4.  Drag and drop the `build` folder onto the page.
5.  It will be live instantly!

## Keep it Updated
If you make changes later:
1.  Run `npm run build` again.
2.  Run `npx vercel --prod` (for Vercel) or drag the new `build` folder to Netlify.
