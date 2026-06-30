import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: '.env.local' });

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAd6E4zPzESFmlCP3oZGlL2jAOePm6LQkA",
  authDomain: "portfolio-c890a.firebaseapp.com",
  projectId: "portfolio-c890a",
  storageBucket: "portfolio-c890a.firebasestorage.app",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Supabase Config
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log("Starting migration from Firebase to Supabase...");
  
  try {
    // 1. Migrate Feedback
    console.log("Fetching feedback from Firebase...");
    const feedbackSnapshot = await getDocs(collection(db, "feedback"));
    const feedbacks = [];
    feedbackSnapshot.forEach(doc => {
      const data = doc.data();
      feedbacks.push({
        name: data.name,
        email: data.email,
        rating: data.rating,
        message: data.message,
        approved: data.approved,
        created_at: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt ? new Date(data.createdAt).toISOString() : new Date().toISOString())
      });
    });

    if (feedbacks.length > 0) {
      console.log(`Migrating ${feedbacks.length} feedbacks to Supabase...`);
      const { error } = await supabase.from('feedback').insert(feedbacks);
      if (error) {
        console.error("Error inserting feedback:", error);
      } else {
        console.log("Feedback migrated successfully!");
      }
    } else {
        console.log("No feedbacks found in Firebase.");
    }

    // 2. Migrate Resume Setting & Storage
    console.log("Fetching resume settings from Firebase...");
    const resumeSnap = await getDoc(doc(db, "settings", "resume"));
    if (resumeSnap.exists()) {
      const data = resumeSnap.data();
      if (data.url) {
        console.log("Downloading resume from Firebase URL...");
        const response = await fetch(data.url);
        const arrayBuffer = await response.arrayBuffer();
        
        // Convert to Node Buffer if needed, but arrayBuffer works for fetch
        const fileName = data.path.split('/').pop();
        console.log(`Uploading resume ${fileName} to Supabase Storage...`);
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(`resumes/${fileName}`, arrayBuffer, {
            contentType: 'application/pdf',
            upsert: true
          });
            
        if (uploadError) {
          console.error("Error uploading resume to Supabase:", uploadError);
        } else {
          console.log("Getting public URL from Supabase...");
          const { data: publicUrlData } = supabase.storage.from('resumes').getPublicUrl(`resumes/${fileName}`);
          
          console.log("Inserting resume settings into Supabase...");
          const { error: settingsError } = await supabase.from('settings').insert({
            id: 'resume',
            url: publicUrlData.publicUrl,
            path: `resumes/${fileName}`
          });
            
          if (settingsError) {
             console.error("Error saving settings:", settingsError);
          } else {
             console.log("Resume data and file migrated successfully!");
          }
        }
      }
    } else {
      console.log("No dynamic resume found in Firebase.");
    }
  } catch (err) {
      console.error("Migration script encountered a fatal error:", err);
  }

  console.log("Migration complete!");
  process.exit(0);
}

migrate();
