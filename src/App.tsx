import React, { useState } from 'react';
import { ReelCard } from './components/ReelCard';
import { UploadPage } from './components/UploadPage';

const REELS_DATA = [
  {
    id: '1',
    src: "https://media.sssinstagram.com/get?__sig=Nm5tNBdnxMvO4HCfrYgZuQ&__expires=1732366876&uri=https%3A%2F%2Finstagram.famm11-1.fna.fbcdn.net%2Fo1%2Fv%2Ft16%2Ff1%2Fm86%2F24454108C3AA526812B29D66F135D8AC_video_dashinit.mp4%3Fstp%3Ddst-mp4%26efg%3DeyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2xpcHMuYzEuNzIwLmJhc2VsaW5lIn0%26_nc_cat%3D108%26vs%3D883533377128315_2257263464%26_nc_vs%3DHBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC8yNDQ1NDEwOEMzQUE1MjY4MTJCMjlENjZGMTM1RDhBQ192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dGc2YteHJIUk4zbmJiWUJBRGQ1aWFXbkNZVjJicV9FQUFBRhUCAsgBACgAGAAbABUAACb20N%252BSwYuIQBUCKAJDMywXQCkAAAAAAAAYEmRhc2hfYmFzZWxpbmVfMV92MREAdf4HAA%253D%253D%26_nc_rid%3Dc9e4e35483%26ccb%3D9-4%26oh%3D00_AYBSk5esQ736tjOAPpmyMRR6UK98dYcfqfOvMz4pmc1EUg%26oe%3D67439F7E%26_nc_sid%3Dd885a2%26dl%3D1",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    username: "vidafit.oficial",
    description: "Seus hábitos criam sua vida 🫧\n1. mantenha seu espaço limpo\n2. invista tempo em leitura e escrita\n3. movimente seu corpo diariamente\n4. aprenda coisas novas\n5. saiba quando parar e relaxar"
  },
  {
    id: '2',
    src: "https://media.sssinstagram.com/get?__sig=jEu3YidmGvt9Rhs-mCRsfQ&__expires=1732367106&uri=https%3A%2F%2Finstagram.fesb4-4.fna.fbcdn.net%2Fo1%2Fv%2Ft16%2Ff1%2Fm86%2FC04CF9453954CF2B0445126E53A4358D_video_dashinit.mp4%3Fstp%3Ddst-mp4%26efg%3DeyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2xpcHMuYzIuNzIwLmJhc2VsaW5lIn0%26_nc_cat%3D110%26vs%3D445255531651200_2421533830%26_nc_vs%3DHBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC9DMDRDRjk0NTM5NTRDRjJCMDQ0NTEyNkU1M0E0MzU4RF92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dNeWwyaG8wVGlHTmFlWUNBRWZYb24ycENSMHRicV9FQUFBRhUCAsgBACgAGAAbABUAACas6aPalpfVPxUCKAJDMywXQE37peNT988YEmRhc2hfYmFzZWxpbmVfMV92MREAdf4HAA%253D%253D%26_nc_rid%3D5fbcd7378a%26ccb%3D9-4%26oh%3D00_AYA2r29T7cuwu-F7sez0uMs3LwQtiRYi6jytpOIS1fdrAQ%26oe%3D67439B78%26_nc_sid%3Dd885a2%26dl%3D1",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    username: "casa.organizada",
    description: "Limpando comigo para uma nova semana!!! 🫧\nTodos os produtos que uso estão no link da bio #reset #limpeza #organizacao"
  }
];

function App() {
  const [isUploadMode, setIsUploadMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const index = Math.round(element.scrollTop / element.clientHeight);
    setActiveIndex(index);
  };

  if (isUploadMode) {
    return <UploadPage />;
  }

  return (
    <div 
      className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll bg-black hide-scrollbar"
      onScroll={handleScroll}
    >
      {REELS_DATA.map((reel, index) => (
        <div key={reel.id} className="snap-start h-screen w-screen">
          <ReelCard
            video={reel}
            isActive={index === activeIndex}
          />
        </div>
      ))}
    </div>
  );
}

export default App;