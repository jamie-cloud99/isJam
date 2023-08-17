import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";
const { VITE_JSON_SERVER } = import.meta.env;

export default defineStore("postStore", () => {
  const postList = ref([]);
  const post = ref({})

  // const post = ref({
  //   id: "1",
  //   createAt: "02 Feb 2021",
  //   startTime: "12:00",
  //   endTime: "20:00",
  //   imageUrl:
  //     "https://github.com/jamie-cloud99/isJam/blob/main/public/images/posts/01_Lovestruck_in_the_city/01.jpg?raw=true",
  //   imgPath: "post/05.jpg",
  //   title: "【愛在大都會】探索愛、真實與自我，都市男女久違的純愛心動！",
  //   category: "影劇",
  //   postType: "跟播紀錄",
  //   tags: ["浪漫愛情", "韓劇", "喜劇", "療癒"],
  //   description:
  //     "<p class='mb-4'>由 kakao TV 製作推出，一集只有 30 分鐘的實驗劇。</p><p class=''>都市男女是一齣仿戀愛真人秀的劇集，每集主人公們都會出來回答訪談問題，有趣的是節目在開頭就說，訪談對象說的可能不是真話！</p>",

  //   content:
  //     "<p class='mb-4'>從第一集兩人初相遇，宰元就對善雅感到好奇，他想知道眼前這個女孩究竟是怎麼樣的一個人？我們便知道，宰元早已陷入。在《春夜》中也曾出現過類似的對話，女主角的同事兼好友對女主角說：「對某個人感到好奇可是個重要徵兆，因為你會時時想起他，那就代表你對他有興趣。」</p><p class='mb-4'>有多久沒有對人感到好奇了呢？好想念啊拼命想要認識一個人，渴望被對方認識的小心思。既大膽妄為又小心翼翼的我，真懷念啊！</p><p class='mb-4'>尹善雅明亮、充滿活力，屬於她的畫面是熱情高漲的，在車上高歌、牽著狗兒在沙灘上奔跑、笑容燦爛真誠，行為鬼靈精怪卻讓人為她瘋狂，她是如此閃耀，在襄陽的白天夜晚，宰元徹底向她臣服。可是回到首爾，尹善雅說，我叫李恩梧，你愛上的不是真正的我。然而，在第三集的時侯，恩梧不就選擇拋下過去的自己，想要做為尹善雅而活了嗎，為什麼又會這麼想呢？恩梧到底是個怎麼樣的女孩，我很好奇。</p><p class='mb-4'>目前看到第五集，感受到劇集想探討的議題：真實/謊言、平凡/特別、個人的獨一無二、一段關係的結束、尋找自我（真實的我與另一個我）</p><p class='mb-4'>(更新)第6集結尾的番外小劇場太有趣了，在《RUN ON》中也有這種手法，不曉得是否為近來韓劇熱衷的表現方式？劇中劇的形式為都會劇開拓更寬廣的發展空間，避免沒有強烈起伏、貼近日常的情節讓觀眾感到疲乏，如何有趣又不突兀的出現在戲劇中，可說是相當挑戰導演功力的一種挑戰。加上就我對自己觀影經驗的觀察，即便該集劇情平淡，沒有特別精彩的戲碼，但只要有個令人眼睛為之一亮的結尾，就會覺得這集很精彩，因此如何將結尾設計的新穎巧妙，也是決定一齣戲成敗的重要關鍵。</p><h4 class='text-xl font-bold mt-8 mb-4 text-stone-900'>都市男女語錄</h4><p class=' text-stone-700 mb-3'>今日事不今日畢，天也不會塌下來，這是我的人生哲學。</p><p class='text-end text-stone-700'>—— 朴宰元</p>",
  // });

  const fetchPostsAll = async () => {
    const res = await axios.get(`${VITE_JSON_SERVER}posts`);
    postList.value = res.data;
  };

  const fetchPost = async (id) => {
    const api = `${VITE_JSON_SERVER}posts/${id}`;
    try {
      const res = await axios.get(api);
      post.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateContent = async ({ id, content }) => {
    const api = `${VITE_JSON_SERVER}posts/${id}`;
    const data = { content };
    try {
      const res = await axios.patch(api, data);
      await fetchPost(id);
    } catch (error) {
      console.log(error);
    }
  };

  const recentEvents = computed(() => {
    return postList.value.slice(0, 6);
  });

  return {
    postList,
    recentEvents,
    post,
    fetchPostsAll,
    updateContent,
    fetchPost,
  };
});
