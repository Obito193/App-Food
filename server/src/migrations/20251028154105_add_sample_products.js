/**
 * @param {import('knex').Knex} knex
 */

exports.up = async function (knex) {
  // Chèn nhiều sản phẩm mẫu
  await knex('product').insert([
    // ===== SNACKS =====
    {
      name: 'Khoai tây chiên',
      category: 'snacks',
      image: 'https://cdn.tgdd.vn/Files/2019/06/15/1173419/cach-chien-khoai-tay-gion-rum-de-lau-khong-mem-202205241727296995.jpg',
      price: '15000',
      description: 'Khoai tây chiên giòn rụm, mặn nhẹ, thích hợp ăn vặt.'
    },
    {
      name: 'Bắp rang bơ',
      category: 'snacks',
      image: 'https://cdn.tgdd.vn/2021/04/CookProduct/Untitled-1-1200x676-8.jpg',
      price: '20000',
      description: 'Bắp rang thơm bơ, ngọt nhẹ, ngon miệng cho mọi dịp.'
    },
    {
      name: 'Bánh quy socola chip',
      category: 'snacks',
      image: 'https://cdn.tgdd.vn/Files/2020/05/11/1254925/cach-lam-banh-quy-socola-nhanh-chong-don-gian-bang-7.jpg',
      price: '25000',
      description: 'Bánh quy giòn tan cùng socola chip ngọt ngào.'
    },
    {
      name: 'Khô gà lá chanh',
      category: 'snacks',
      image: 'https://cdn.tgdd.vn/2021/12/CookRecipe/GalleryStep/thanh-pham-668.jpg',
      price: '35000',
      description: 'Khô gà cay nhẹ, thơm mùi lá chanh, ngon khó cưỡng.'
    },
    {
      name: 'Bánh tráng trộn',
      category: 'snacks',
      image: 'https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/10/cach-lam-banh-trang-tron-thumb.jpg',
      price: '30000',
      description: 'Bánh tráng dai mềm, trộn cùng khô bò, trứng cút và sa tế.'
    },

    // ===== FAST FOOD =====
    {
      name: 'Burger bò phô mai',
      category: 'fast_food',
      image: 'https://burgerking.vn/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/e/x/exc_whopper_2.jpg',
      price: '60000',
      description: 'Bánh burger bò nướng cùng phô mai tan chảy thơm ngon.'
    },
    {
      name: 'Pizza hải sản',
      category: 'fast_food',
      image: 'https://cdn.tgdd.vn/2020/09/CookProduct/1200bzhspm-1200x676.jpg',
      price: '120000',
      description: 'Pizza hải sản tươi ngon với tôm, mực và phô mai mozzarella.'
    },
    {
      name: 'Gà rán giòn cay',
      category: 'fast_food',
      image: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/kien-thuc/cach-lam-ga-ran-sot-cay-han-quoc/cach-lam-ga-ran-sot-cay-han-quoc-5.jpg',
      price: '50000',
      description: 'Miếng gà rán giòn rụm, cay nhẹ, vàng ươm hấp dẫn.'
    },
    {
      name: 'Mì Ý bò bằm',
      category: 'fast_food',
      image: 'https://cdn.tgdd.vn/2021/11/CookRecipe/Avatar/mi-y-sot-ca-chua-bo-bam-cong-thuc-duoc-chia-se-tu-nguoi-dung-thumbnail.jpg',
      price: '70000',
      description: 'Mì Ý với sốt bò bằm cà chua đậm vị và phô mai béo ngậy.'
    },
    {
      name: 'Hotdog xúc xích Đức',
      category: 'fast_food',
      image: 'https://file.hstatic.net/200000680207/file/goi_y_cach_lam_banh_hotdog_ccda2308332c4bad92e1d982c28957ce_grande.jpg',
      price: '45000',
      description: 'Bánh mì kẹp xúc xích Đức cùng tương cà, mù tạt và hành chiên.'
    },

    // ===== DRINKS =====
    {
      name: 'Trà sữa trân châu đường đen',
      category: 'drinks',
      image: 'https://bizweb.dktcdn.net/100/519/595/files/1-180559f8-1ce7-43b7-83ce-a37eac803791.jpg?v=1744966178923',
      price: '40000',
      description: 'Trà sữa béo ngậy, trân châu dẻo mềm và vị đường đen đặc trưng.'
    },
    {
      name: 'Cà phê sữa đá',
      category: 'drinks',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Ca_Phe_Sua_Da.jpg/330px-Ca_Phe_Sua_Da.jpg',
      price: '25000',
      description: 'Cà phê sữa đậm đà, mát lạnh, cho ngày dài tỉnh táo.'
    },
    {
      name: 'Nước cam ép tươi',
      category: 'drinks',
      image: 'https://cdn.tgdd.vn/2020/07/CookProductThumb/nuocscam-620x620.jpg',
      price: '30000',
      description: 'Nước cam ép nguyên chất, không đường, nhiều vitamin C.'
    },
    {
      name: 'Trà đào cam sả',
      category: 'drinks',
      image: 'https://cdn.tgdd.vn/2020/07/CookRecipe/GalleryStep/thanh-pham-273.jpg',
      price: '35000',
      description: 'Trà đào thơm mát, kết hợp cam và sả dịu nhẹ.'
    },
    {
      name: 'Soda việt quất',
      category: 'drinks',
      image: 'https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173051/Originals/soda-viet-quat-6.jpg',
      price: '35000',
      description: 'Soda việt quất mát lạnh, vị chua ngọt hấp dẫn.'
    },
  ]);
};

exports.down = async function (knex) {
  // Xóa các sản phẩm đã thêm nếu rollback
  await knex('product').whereIn('category', ['snacks', 'fast_food', 'drinks']).del();
};
