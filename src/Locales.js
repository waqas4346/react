let lang = localStorage.getItem('lang') || '';

const en = {
    // Top navbar
    home: 'Home',
    dramas: 'Dramas',
    telefilms: 'Telefims',
    videosongs: 'Video Songs',
    newrelease: 'New Release',
    searchfor: 'Serach For',
    profile: 'Profile',
    logout: 'Logout',

    // Login
    subscription: 'Subscription',
    mobilenumber: 'Mobile Number',
    continue: 'Continue',
    subscribe: 'Subscribe',
    pleasewait: 'Please wait ...',
    insuficientbalancemsg: 'You have insufficient balance, please try again later!',
    somethingwrongmsg:'Something went wrong, please try again!',
    validnumber: 'Please enter valid number!',
    selectcarrier: 'Please select your carrier!',
    sendpininfo: 'We have sent you an SMS with a Pin code to your number for verification',
    sendpinerrmesg: 'Unable to send pin, please try again!',
    enterpin: 'Enter Pin Code Sent to Your Number',
    enterpinmsg: 'Please enter your pin!',
    confirmpinerrmsg: 'Unable to confirm pin, please try again!',
    dontrecievepin: 'Didn’t Receive the Pin?',
    resendpin: 'Resend Pin',
    
    zainpricepoints: 'The service price is 0.66 SAR per day and renewed daily. To cancel your subscription please send U1 to 751164.',
    stcpricepoints: 'The service price is 0.65 SAR per day and renewed daily. To cancel your subscription please send U1 to 801761.',
    mobilypricepoints: 'The service price is 1 SAR per day and renewed daily. To cancel your subscription please send U6 to 606156.',


    //VideoPlayer, RelatedContent
    episode: 'Episode ',
    loadmore: 'Load More',
    loading: 'Loading ...',
    searchresult: 'Search Result For ',
    norelatedcontent: 'No related content to show. ',

    //Search
    all: 'All',
    movies: 'Movies',
    nocontentfound: 'No Content found',
   
    //Recently watched
    recentlywatched: 'Recently Watched',

    //Profile
    profile: 'Profile',
    name: 'name',
    email: 'email',
    edit: 'Edit',
    save: 'Save',
    profileeditsuccmsg: 'Profile edited successfully!',
    profileeditfailmsg: 'Profile editing failed!',
    fillallfields: 'Please fill all fields!',
    enteremailmsg: 'Please Enter Valid Email!',

    //Footer
    quicklinks: 'Quick Links',
    helpandsupport: 'Help & Suppoprt',
    contactus: 'Contact us',
    privacypolicy: 'Privacy Policy',

    //Play
    relatedcontent: 'Related Content'

}


const ur = {
    // Top navbar
    home: 'ہوم',
    dramas: 'ڈرامہ',
    telefilms: 'ٹیلی فلمیں',
    videosongs: 'ویڈیو گانے',
    newrelease: 'نئ ریلیز',
    searchfor: 'تلاش کریں',
    profile: 'پروفائل',
    logout: 'لاگ آوٹ',

    // Login
    subscription: 'رکنیت',
    mobilenumber: 'موبائل نمبر',
    continue: 'جاری رہے',
    subscribe: 'سبسکرائب',
    pleasewait: 'برائے مہربانی انتظار کریں ...',
    insuficientbalancemsg: 'آپکا بیلنس ناکافی ہے، برائے مہربانی دوبارہ کوشش کریں!',
    somethingwrongmsg:'!برائے مہربانی تھوڑا انتظار کریں تکنیکی مسلہ حل کیا جارہا ہے، برائے مہربانی دوبارہ کوشش کریں',
    validnumber: 'براہ کرم درست نمبر درج کریں!',
    selectcarrier: 'براہ کرم اپنا کیریئر منتخب کریں!',
    sendpininfo: 'ہم نے ایک میسج بھیجا ہے پن کوڈ کے ساتھ آپکے نمبر پر تصدیق کرنے کیلئے',
    sendpinerrmesg: 'پن بھیجنے سے قاصر ، براہ کرم دوبارہ کوشش کریں!',
    enterpin: 'اپنے نمبر پر بھیجے گئے کوڈ کو داخل کریں',
    enterpinmsg: 'براہ کرم اپنا پن درج کریں!',
    confirmpinerrmsg: 'پن کی تصدیق کرنے سے قاصر ، براہ کرم دوبارہ کوشش کریں!',
    dontrecievepin: 'پن موصول نہیں ہوا؟',
    resendpin: 'پن دوبارہ بھیجیں',
    zainpricepoints: 'سروس کی قیمت س۔ر 0.66 روزانہ ہے اور روزانہ تجدید ہو گی. سبسکرپشن ختم کرنے کیلئے برائے مہربانی U1 لکھ کر 751164 پر بھیجیں.',
    stcpricepoints: 'سروس کی قیمت س۔ر 0.65 روزانہ ہے اور روزانہ تجدید ہو گی. سبسکرپشن ختم کرنے کیلئے برائے مہربانی U1 لکھ کر 801761 پر بھیجیں.',
    mobilypricepoints: 'سروس کی قیمت س۔ر 1 روزانہ ہے اور روزانہ تجدید ہو گی. سبسکرپشن ختم کرنے کیلئے برائے مہربانی U6 لکھ کر 606156 پر بھیجیں.',


    //VideoPlayer, RelatedContent, Search
    episode: 'قسط ',
    loadmore: 'مزید لوڈ کریں',
    loading: 'لوڈ ہو رہا ہے…',
    searchresult: 'تلاش کے نتائج',
    norelatedcontent: 'کوئی مواد نہیں ملا',
    
    //Search
    all: 'سب',
    movies: 'موویز',
    nocontentfound: 'کوئی مواد نہیں ملا',
    


    //Recently watched
    recentlywatched: 'حال ہی میں دیکھا گیا',

    //Profile
    profile: 'پروفائل',
    name: 'نام',
    email: 'ای میل',
    edit: 'ترمیم',
    save: 'محفوظ کریں',
    profileeditsuccmsg: 'پروفائل میں کامیابی سے ترمیم کی گئی ہے!',
    profileeditfailmsg: 'پروفائل میں ترمیم ناکام ہوگئی',
    fillallfields: 'براہ کرم تمام خانوں کو بھریں!',
    enteremailmsg: 'براہ کرم درست ای میل درج کریں!',

    
    //Footer
    quicklinks: 'فوری روابط',
    helpandsupport: 'مدد اور مدد',
    contactus: 'ہم سے رابطہ کریں',
    privacypolicy: 'رازداری کی پالیسی',

    //Play
    relatedcontent: 'ملتا جلتا مواد'

}

const i18n = lang === '' ? en : ur;

export default i18n;
