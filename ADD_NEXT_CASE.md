# How I add the next case study

Where it goes: src/app/projects/page.tsx. The `projects` list at the top of that file holds every project card on my Projects page.

Steps (about 30 minutes):
1. Open my Claude Project and say: "I finished [project]. Interview me for a case study in my voice, one question at a time."
2. Write the three beats in 2 to 3 sentences:
   - Problem: who needed it and what was going wrong.
   - What I did: the stack, the key decision, and the thing that broke.
   - What came of it: the result, plus one honest limitation.
3. In src/app/projects/page.tsx, copy one block inside the `projects` list and fill in:
   -name: the project name
   -stack: the tools used
   -description: the three beats, written as short sentences
   -link: the GitHub repository, or the live URL
4. Make sure that project's GitHub README is complete (setup steps, what it does, screenshots), because the portfolio earns the click and the README closes the deal.
5. Run `npm run dev`, open the Projects page, and check the new card.
6. Commit and push; Vercel redeploys automatically. Open the live site on my phone to confirm.

Next piece: LEVELUP, a habit tracker with Gemini-written insights.
Repo: https://github.com/KaziMuiz/Level-up
Live: https://level-up-eta-six.vercel.app