window.addEventListener('DOMContentLoaded', init);

console.log("1221 7:12")
let pink_balloon_number=0;
let blue_balloon_number=0;
let green_balloon_number=0;
let yellow_balloon_number=0;

function init() {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas')
    });
    // ウィンドウサイズ設定
    width = document.getElementById('main_canvas').getBoundingClientRect().width;
    height = document.getElementById('main_canvas').getBoundingClientRect().height;
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    console.log(window.devicePixelRatio);
    console.log(width + ", " + height);

    let floor=1;
    
    
    let pink_balloon_paragraph = document.getElementById("pink_balloons");
    let blue_balloon_paragraph = document.getElementById("blue_balloons");
    let green_balloon_paragraph = document.getElementById("green_balloons");
    let yellow_balloon_paragraph = document.getElementById("yellow_balloons");

    let map_state = false;
    let click_time = 0;
    let choose = null;
    let current_pos = null;
    let warp_x=[-3200, -1600, 1800, 3500, 1800, -1300, 4000, 2700, -4100, 7650, 6650, -4050, -8750, -100];
    let warp_z=[100, -2800, -3000, 0, 2800, 2900, 350, 2900, -1950, 4150, -5850, -7750, 1750, 9050];

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 110000);
    camera.position.set(-8395, -10400, -4534);
    let cameraPositionX = -8395;
    //let cameraPositionX = 0;
    let cameraPositionY = -10400;
    //let cameraPositionY = 800;
    let cameraPositionZ = -4534;
    //let cameraPositionZ = 1300;


    let cameraLookX = -8377;
    //let cameraLookX = 0;
    let cameraLookY = -10400;
    //let cameraLookY = 200;
    let cameraLookZ = -4523;

    let keyCode = 0;
    window.addEventListener('keydown',
    event => {
        keyCode = event.keyCode;
        console.log(keyCode);
        if(keyCode == 80){
            click_time++;
        }else if(keyCode == 76){
            meter_height+=10;
            meter_value.style.height=meter_height+"px";
            console.log("高さ変えたよ");
            console.log(meter_height);
        }
    });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.target.set(0, 10400, 0); 

    // Load GLTF or GLB
    const loader = new THREE.GLTFLoader();
    let number_of_objects = 62;
    let model_loaded = Array(number_of_objects);

    let load_glb = (url, model, num, size_x, size_y, size_z, pos_x, pos_y, pos_z) =>{
            loader.load(
                url,
                function (gltf) {
                    model = gltf.scene;
                    // model.name = "model_with_cloth";
                    model.scale.set(size_x, size_y, size_z);
                    model.position.set(pos_x, pos_y, pos_z);
                    scene.add(gltf.scene);
                    console.log("model loaded");
                    // model["test"] = 100;
                    model_loaded[num]=model;
                },
                function (error) {
                    console.log('An error happened');
                    console.log(error);
                }
            )
    };

    let deg_to_rad = (deg) =>{
        return deg*(Math.PI/180)
    };

    console.log(deg_to_rad(45))

    const url_first_floor = '../assets/firstfloor_only.glb';
    const url_second_floor = '../assets/secondfloor_only.glb';
    const url_third_floor = '../assets/thirdfloor_only.glb';
    const url_grass = '../assets/grass.glb';
    const url_ice = '../assets/ICE.glb';
    const url_light = '../assets/LIGHT.glb';
    const url_rock = '../assets/ROCK.glb';
    const url_slime = '../assets/SLIME.glb';
    const url_balloon_blue_1 = '../assets/balloon_blue_1.glb';
    const url_balloon_blue_2 = '../assets/balloon_blue_2.glb';
    const url_balloon_blue_3 = '../assets/balloon_blue_3.glb';
    const url_balloon_pink_1 = '../assets/balloon_pink_1.glb';
    const url_balloon_pink_2 = '../assets/balloon_pink_2.glb';
    const url_balloon_pink_3 = '../assets/balloon_pink_3.glb';
    const url_balloon_green_1 = '../assets/balloon_green_1.glb';
    const url_balloon_green_2 = '../assets/balloon_green_2.glb';
    const url_balloon_green_3 = '../assets/balloon_green_3.glb';
    const url_balloon_yellow_1 = '../assets/balloon_yellow_1.glb';
    const url_balloon_yellow_2 = '../assets/balloon_yellow_2.glb';
    const url_balloon_yellow_3 = '../assets/balloon_yellow_3.glb';
    const url_goal = '../assets/GOAL.glb';
    const url_alien = '../assets/snowman_with_balloons.glb';

    let model_first = null;
    let model_second = null;
    let model_third = null;
    let model_grass = null;

    let model_ice_1_1 = null;
    let model_ice = null;

    let model_light = null;
    let model_rock = null;
    let model_slime = null;

    let model_balloon_blue_1 = null;
    let model_balloon_blue_2 = null;
    let model_balloon_blue_3 = null;
    let model_balloon_pink_1 = null;
    let model_balloon_pink_2 = null;
    let model_balloon_pink_3 = null;
    let model_balloon_green_1 = null;
    let model_balloon_green_2 = null;
    let model_balloon_green_3 = null;
    let model_balloon_yellow_1 = null;
    let model_balloon_yellow_2 = null;
    let model_balloon_yellow_3 = null;

    let model_goal = null;
    let model_alien = null;

    load_glb(url_first_floor, model_first, 0, 400.0, 400.0, 400.0, 0, -10600, 0);
    load_glb(url_second_floor, model_second, 1, 400.0, 400.0, 400.0, 0, 0, 0);
    load_glb(url_third_floor, model_third, 2, 400.0, 400.0, 400.0, 0, 9200, 0);
    load_glb(url_grass, model_grass, 3, 600.0, 600.0, 600.0, 0, -11400, 0);
    load_glb(url_goal, model_goal, 60, 400, 400, 400, 0, 15000, 0);
    load_glb(url_alien, model_alien, 61, 100, 100, 100, -600, 15000, 0);


    //1Fのオブジェクトを配置する
    load_glb(url_ice, model_ice_1_1, 4, 120.0, 120.0, 120.0, 2600, -10400, -1800);
    load_glb(url_light, model_light, 5, 120.0, 120.0, 120.0, 5400, -10400, -1900);
    load_glb(url_rock, model_rock, 6, 120.0, 120.0, 120.0, 500, -10500, -8000);
    load_glb(url_ice, model_ice, 7, 120.0, 120.0, 120.0, -4000, -10400, 6900);
    load_glb(url_light, model_light, 8, 120.0, 120.0, 120.0, 4500, -10400, 5000);
    load_glb(url_rock, model_rock, 9, 120.0, 120.0, 120.0, -6000, -10500, -3000);
    load_glb(url_balloon_blue_1, model_balloon_blue_1, 12, 120.0, 120.0, 120.0, 2600, -10400, -1800);
    load_glb(url_balloon_pink_1, model_balloon_pink_1, 13, 120.0, 120.0, 120.0, 5400, -10400, -1900);
    load_glb(url_balloon_green_1, model_balloon_green_1, 10, 120.0, 120.0, 120.0, -6600, -10400, 5000);
    load_glb(url_balloon_yellow_1, model_balloon_yellow_1, 11, 120.0, 120.0, 120.0, 500, -10400, -8000);
    load_glb(url_balloon_blue_1, model_balloon_blue_1, 16, 120.0, 120.0, 120.0, -4000, -10400, 6900);
    load_glb(url_balloon_pink_1, model_balloon_pink_1, 17, 120.0, 120.0, 120.0, 4500, -10400, 5000);
    load_glb(url_balloon_green_1, model_balloon_green_1, 14, 120.0, 120.0, 120.0, -4000, -10400, 1000);
    load_glb(url_balloon_yellow_1, model_balloon_yellow_1, 15, 120.0, 120.0, 120.0, -6000, -10400, -3000);
    load_glb(url_slime, model_slime, 53, 120.0, 120.0, 120.0, -6600, -10400, 5000);
    load_glb(url_slime, model_slime, 54, 120.0, 120.0, 120.0, -4000, -10400, 1000);

    //2Fのオブジェクトを配置する
    load_glb(url_ice, model_ice, 18, 120.0, 120.0, 120.0, 4200*Math.sin(deg_to_rad(107)), 280, 4200*Math.cos(deg_to_rad(107)));
    load_glb(url_light, model_light, 19, 120.0, 120.0, 120.0, 4200*Math.sin(deg_to_rad(127)), 280, 4200*Math.cos(deg_to_rad(127)));
    load_glb(url_rock, model_rock, 20, 120.0, 120.0, 120.0, 4200*Math.sin(deg_to_rad(22)), 280, 4200*Math.cos(deg_to_rad(22)));
    load_glb(url_ice, model_ice, 21, 120.0, 120.0, 120.0, 6000*Math.sin(deg_to_rad(150)), 280, 7000*Math.cos(deg_to_rad(150)));
    load_glb(url_light, model_light, 22, 120.0, 120.0, 120.0, 4800*Math.sin(deg_to_rad(255)), 280, 4800*Math.cos(deg_to_rad(255)));
    load_glb(url_rock, model_rock, 23, 120.0, 120.0, 120.0, 6000*Math.sin(deg_to_rad(225)), 280, 6000*Math.cos(deg_to_rad(225)));
    load_glb(url_balloon_blue_2, model_balloon_blue_2, 24, 120.0, 120.0, 120.0, 4200*Math.sin(deg_to_rad(107)), 280, 4200*Math.cos(deg_to_rad(107)));
    load_glb(url_balloon_pink_2, model_balloon_pink_2, 25, 120.0, 120.0, 120.0, 4200*Math.sin(deg_to_rad(127)), 280, 4200*Math.cos(deg_to_rad(127)));
    load_glb(url_balloon_green_2, model_balloon_green_2, 26, 120.0, 120.0, 120.0, 0, 280, 4200);
    load_glb(url_balloon_yellow_2, model_balloon_yellow_2, 27, 120.0, 120.0, 120.0, 4200*Math.sin(deg_to_rad(22)), 280, 4200*Math.cos(deg_to_rad(22)));
    load_glb(url_balloon_blue_2, model_balloon_blue_2, 28, 120.0, 120.0, 120.0, 6000*Math.sin(deg_to_rad(150)), 280, 6000*Math.cos(deg_to_rad(150)));
    load_glb(url_balloon_pink_2, model_balloon_pink_2, 29, 120.0, 120.0, 120.0, 4800*Math.sin(deg_to_rad(255)), 280, 4800*Math.cos(deg_to_rad(255)));
    load_glb(url_balloon_green_2, model_balloon_green_2, 30, 120.0, 120.0, 120.0, 6000*Math.sin(deg_to_rad(315)), 280, 6000*Math.cos(deg_to_rad(315)));
    load_glb(url_balloon_yellow_2, model_balloon_yellow_2, 31, 120.0, 120.0, 120.0, 6000*Math.sin(deg_to_rad(225)), 280, 6000*Math.cos(deg_to_rad(225)));
    load_glb(url_slime, model_slime, 55, 120.0, 120.0, 120.0, 0, 280, 4200);
    load_glb(url_slime, model_slime, 56, 120.0, 120.0, 120.0, 6000*Math.sin(deg_to_rad(315)), 280, 6000*Math.cos(deg_to_rad(315)));

    //3Fのオブジェクトを配置する
    load_glb(url_ice, model_ice, 32, 120.0, 120.0, 120.0, 2000*Math.sin(deg_to_rad(30)), 9300, 2000*Math.cos(deg_to_rad(30)));
    load_glb(url_light, model_light, 33, 120.0, 120.0, 120.0, 2000*Math.sin(deg_to_rad(90)), 9300, 2000*Math.cos(deg_to_rad(90)));
    load_glb(url_rock, model_rock, 34, 120.0, 120.0, 120.0, 2000*Math.sin(deg_to_rad(210)), 9300, 2000*Math.cos(deg_to_rad(210)));
    load_glb(url_ice, model_ice, 35, 120.0, 120.0, 120.0, 2000*Math.sin(deg_to_rad(270)), 9300, 2000*Math.cos(deg_to_rad(270)));
    load_glb(url_light, model_light, 36, 120.0, 120.0, 120.0, 2000*Math.sin(deg_to_rad(330)), 9300, 2000*Math.cos(deg_to_rad(330)));
    load_glb(url_rock, model_rock, 37, 120.0, 120.0, 120.0, 900*Math.sin(deg_to_rad(60)), 9300, 900*Math.cos(deg_to_rad(60)));
    load_glb(url_ice, model_ice, 38, 120.0, 120.0, 120.0, 900*Math.sin(deg_to_rad(120)), 9300, 900*Math.cos(deg_to_rad(120)));
    load_glb(url_light, model_light, 39, 120.0, 120.0, 120.0, 900*Math.sin(deg_to_rad(180)), 9300, 900*Math.cos(deg_to_rad(180)));
    load_glb(url_rock, model_rock, 40, 120.0, 120.0, 120.0, 900*Math.sin(deg_to_rad(300)), 9300, 900*Math.cos(deg_to_rad(300)));
    load_glb(url_balloon_blue_3, model_balloon_blue_3, 44, 120.0, 120.0, 120.0, 2000*Math.sin(deg_to_rad(30)), 9300, 2000*Math.cos(deg_to_rad(30)));
    load_glb(url_balloon_pink_3, model_balloon_pink_3, 41, 120.0, 120.0, 120.0, 2000*Math.sin(deg_to_rad(90)), 9300, 2000*Math.cos(deg_to_rad(90)));
    load_glb(url_balloon_green_3, model_balloon_green_3, 42, 120.0, 120.0, 120.0, 2000*Math.sin(deg_to_rad(150)), 9300, 2000*Math.cos(deg_to_rad(150)));
    load_glb(url_balloon_yellow_3, model_balloon_yellow_3, 43, 120.0, 120.0, 120.0, 2000*Math.sin(deg_to_rad(210)), 9300, 2000*Math.cos(deg_to_rad(210)));
    load_glb(url_balloon_blue_3, model_balloon_blue_3, 48, 120.0, 120.0, 120.0, 2000*Math.sin(deg_to_rad(270)), 9300, 2000*Math.cos(deg_to_rad(270)));
    load_glb(url_balloon_pink_3, model_balloon_pink_3, 45, 120.0, 120.0, 120.0, 2000*Math.sin(deg_to_rad(330)), 9300, 2000*Math.cos(deg_to_rad(330)));
    load_glb(url_balloon_green_3, model_balloon_green_3, 46, 120.0, 120.0, 120.0, 900*Math.sin(deg_to_rad(0)), 9300, 900*Math.cos(deg_to_rad(0)));
    load_glb(url_balloon_yellow_3, model_balloon_yellow_3, 47, 120.0, 120.0, 120.0, 900*Math.sin(deg_to_rad(60)), 9300, 900*Math.cos(deg_to_rad(60)));
    load_glb(url_balloon_blue_3, model_balloon_blue_3, 52, 120.0, 120.0, 120.0, 900*Math.sin(deg_to_rad(120)), 9300, 900*Math.cos(deg_to_rad(120)));
    load_glb(url_balloon_pink_3, model_balloon_pink_3, 49, 120.0, 120.0, 120.0, 900*Math.sin(deg_to_rad(180)), 9300, 900*Math.cos(deg_to_rad(180)));
    load_glb(url_balloon_green_3, model_balloon_green_3, 50, 120.0, 120.0, 120.0, 900*Math.sin(deg_to_rad(240)), 9300, 900*Math.cos(deg_to_rad(240)));
    load_glb(url_balloon_yellow_3, model_balloon_yellow_3, 51, 120.0, 120.0, 120.0, 900*Math.sin(deg_to_rad(300)), 9300, 900*Math.cos(deg_to_rad(300)));
    load_glb(url_slime, model_slime, 57, 120.0, 120.0, 120.0, 2000*Math.sin(deg_to_rad(150)), 9300, 2000*Math.cos(deg_to_rad(150)));
    load_glb(url_slime, model_slime, 58, 120.0, 120.0, 120.0, 900*Math.sin(deg_to_rad(0)), 9300, 900*Math.cos(deg_to_rad(0)));
    load_glb(url_slime, model_slime, 59, 120.0, 120.0, 120.0, 900*Math.sin(deg_to_rad(240)), 9300, 900*Math.cos(deg_to_rad(240)));

    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

    // 平行光源
    // const light_dir_strongest = new THREE.DirectionalLight(0xFFFFFF);
    // light_dir_strongest.intensity = 0.4; // 光の強さを倍に
    // light_dir_strongest.position.set(1, 1, 1);
    // // シーンに追加
    // scene.add(light_dir_strongest);

    //環境光源
    const light_environment = new THREE.AmbientLight(0xFFFFFF, 0.1);
    scene.add(light_environment);

    //Area光源 1階の
    const rectLight = new THREE.RectAreaLight( 0xffffff, 10,  10000, 8000);
    rectLight.position.set( 0, -2000, 0 );
    rectLight.lookAt( 0, -100000, 0 );
    scene.add( rectLight );

    //Spot光源　2階の
    const light_spot_second = new THREE.SpotLight(0xFBE5D0, 1, 10000, Math.PI / 4, 10, 0.6);
    light_spot_second.position.set( 5000, 5000, 0 );
    light_spot_second.lookAt( -2000, 0, 0 );
    light_spot_second.castShadow = true;
    scene.add(light_spot_second);

    const light_spot_third = new THREE.SpotLight(0xFBE5D0, 1, 10000, Math.PI / 4, 10, 0.9);
    light_spot_third.position.set( -5000, 5000, 0 );
    light_spot_third.lookAt( 2000, 0, 0 );
    light_spot_third.castShadow = true;
    scene.add(light_spot_third);

    const light_spot_fourth = new THREE.SpotLight(0xFBE5D0, 1, 10000, Math.PI / 4, 10, 0.7);
    light_spot_fourth.position.set( 0, 5000, 5000 );
    light_spot_fourth.lookAt( 0, 0, -2000 );
    light_spot_fourth.castShadow = true;
    scene.add(light_spot_fourth);

    const light_spot_fifth = new THREE.SpotLight(0xFBE5D0, 1, 10000, Math.PI / 4, 10, 0.5);
    light_spot_fifth.position.set( 0, 5000, -5000 );
    light_spot_fifth.lookAt( 0, 0, 2000 );
    light_spot_fifth.castShadow = true;
    scene.add(light_spot_fifth);

    const light_spot_sixth = new THREE.SpotLight(0xFBE5D0, 0.5, 10000, Math.PI / 4, 10, 0.5);
    light_spot_sixth.position.set( -3000, 5000, -3000 );
    light_spot_sixth.lookAt( 3000, 1500, 3000 );
    light_spot_sixth.castShadow = true;
    scene.add(light_spot_sixth);

    const light_spot_seventh = new THREE.SpotLight(0xFBE5D0, 0.5, 10000, Math.PI / 4, 10, 0.5);
    light_spot_seventh.position.set( 3000, 5000, -3000 );
    light_spot_seventh.lookAt( -3000, 1500, 3000 );
    light_spot_seventh.castShadow = true;
    scene.add(light_spot_seventh);

    const light_spot_eighth = new THREE.SpotLight(0xFBE5D0, 0.5, 10000, Math.PI / 4, 10, 0.5);
    light_spot_eighth.position.set( -3000, 5000, 3000 );
    light_spot_eighth.lookAt( 3000, 1500, -3000 );
    light_spot_eighth.castShadow = true;
    scene.add(light_spot_eighth);

    const light_spot_ninth = new THREE.SpotLight(0xFBE5D0, 0.5, 10000, Math.PI / 4, 10, 0.5);
    light_spot_ninth.position.set( 3000, 5000, 3000 );
    light_spot_ninth.lookAt( -3000, 1500, -3000 );
    light_spot_ninth.castShadow = true;
    scene.add(light_spot_ninth);

    //3階のpointlight

    const light_spot = new THREE.SpotLight(0xFBE5D0, 1, 10000, Math.PI / 4, 10, 0.6);
    light_spot.position.set( 0, 13000, 0 );
    light_spot.lookAt( 0, 8000, 0 );
    light_spot.castShadow = true;
    scene.add(light_spot);

    const point_light_3 = new THREE.PointLight(0x02B1FC, 10, 1000, 0.5);
    point_light_3.position.set( 0, 9300, 3900 );
    scene.add(point_light_3);

    const point_light_4 = new THREE.PointLight(0x02B1FC, 10, 1000, 0.5);
    point_light_4.position.set( 3900, 9300, 0 );
    scene.add(point_light_4);

    const point_light_5 = new THREE.PointLight(0x02B1FC, 10, 1000, 0.5);
    point_light_5.position.set( 0, 9300, -3900 );
    scene.add(point_light_5);

    const point_light_6 = new THREE.PointLight(0x02B1FC, 10, 1000, 0.5);
    point_light_6.position.set( -3900, 9300, 0);
    scene.add(point_light_6);

    const point_light_7 = new THREE.PointLight(0x02B1FC, 10, 1000, 0.5);
    point_light_7.position.set(3900*Math.cos(deg_to_rad(30)), 9300, 3900*Math.sin(deg_to_rad(30)));
    scene.add(point_light_7);

    const point_light_8 = new THREE.PointLight(0x02B1FC, 10, 1000, 0.5);
    point_light_8.position.set(3900*Math.cos(deg_to_rad(60)), 9300, 3900*Math.sin(deg_to_rad(60)));
    scene.add(point_light_8);

    const point_light_9 = new THREE.PointLight(0x02B1FC, 10, 1000, 0.5);
    point_light_9.position.set(3900*Math.cos(deg_to_rad(120)), 9300, 3900*Math.sin(deg_to_rad(120)));
    scene.add(point_light_9);

    const point_light_10 = new THREE.PointLight(0x02B1FC, 10, 1000, 0.5);
    point_light_10.position.set(3900*Math.cos(deg_to_rad(150)), 9300, 3900*Math.sin(deg_to_rad(150)));
    scene.add(point_light_10);

    const point_light_11 = new THREE.PointLight(0x02B1FC, 10, 1000, 0.5);
    point_light_11.position.set(3900*Math.cos(deg_to_rad(210)), 9300, 3900*Math.sin(deg_to_rad(210)));
    scene.add(point_light_11);

    const point_light_12 = new THREE.PointLight(0x02B1FC, 10, 1000, 0.5);
    point_light_12.position.set(3900*Math.cos(deg_to_rad(240)), 9300, 3900*Math.sin(deg_to_rad(240)));
    scene.add(point_light_12);

    const point_light_13 = new THREE.PointLight(0x02B1FC, 10, 1000, 0.5);
    point_light_13.position.set(3900*Math.cos(deg_to_rad(300)), 9300, 3900*Math.sin(deg_to_rad(300)));
    scene.add(point_light_13);

    const point_light_14 = new THREE.PointLight(0x02B1FC, 10, 1000, 0.5);
    point_light_14.position.set(3900*Math.cos(deg_to_rad(330)), 9300, 3900*Math.sin(deg_to_rad(330)));
    scene.add(point_light_14);

    const point_light_15 = new THREE.PointLight(0x6F51A1, 10, 1000, 0.5);
    point_light_15.position.set( 0, 9240, 2000 );
    scene.add(point_light_15);

    const point_light_16 = new THREE.PointLight(0x6F51A1, 10, 1000, 0.5);
    point_light_16.position.set( 2000, 9240, 0 );
    scene.add(point_light_16);

    const point_light_17 = new THREE.PointLight(0x6F51A1, 10, 1000, 0.5);
    point_light_17.position.set( 0, 9240, -2000 );
    scene.add(point_light_17);

    const point_light_18 = new THREE.PointLight(0x6F51A1, 10, 1000, 0.5);
    point_light_18.position.set( -2000, 9240, 0);
    scene.add(point_light_18);

    const point_light_19 = new THREE.PointLight(0x6F51A1, 10, 1000, 0.5);
    point_light_19.position.set(2000*Math.cos(deg_to_rad(30)), 9240, 2000*Math.sin(deg_to_rad(30)));
    scene.add(point_light_19);

    const point_light_20 = new THREE.PointLight(0x6F51A1, 10, 1000, 0.5);
    point_light_20.position.set(2000*Math.cos(deg_to_rad(60)), 9240, 2000*Math.sin(deg_to_rad(60)));
    scene.add(point_light_20);

    const point_light_21 = new THREE.PointLight(0x6F51A1, 10, 1000, 0.5);
    point_light_21.position.set(2000*Math.cos(deg_to_rad(120)), 9240, 2000*Math.sin(deg_to_rad(120)));
    scene.add(point_light_21);

    const point_light_22 = new THREE.PointLight(0x6F51A1, 10, 1000, 0.5);
    point_light_22.position.set(2000*Math.cos(deg_to_rad(150)), 9240, 2000*Math.sin(deg_to_rad(150)));
    scene.add(point_light_22);

    const point_light_23 = new THREE.PointLight(0x6F51A1, 10, 1000, 0.5);
    point_light_23.position.set(2000*Math.cos(deg_to_rad(210)), 9240, 2000*Math.sin(deg_to_rad(210)));
    scene.add(point_light_23);

    const point_light_24 = new THREE.PointLight(0x6F51A1, 10, 1000, 0.5);
    point_light_24.position.set(2000*Math.cos(deg_to_rad(240)), 9240, 2000*Math.sin(deg_to_rad(240)));
    scene.add(point_light_24);

    const point_light_25 = new THREE.PointLight(0x6F51A1, 10, 1000, 0.5);
    point_light_25.position.set(2000*Math.cos(deg_to_rad(300)), 9240, 2000*Math.sin(deg_to_rad(300)));
    scene.add(point_light_25);

    const point_light_26 = new THREE.PointLight(0x6F51A1, 10, 1000, 0.5);
    point_light_26.position.set(2000*Math.cos(deg_to_rad(330)), 9240, 2000*Math.sin(deg_to_rad(330)));
    scene.add(point_light_26);
    let is_target_destroyed = false;
    date_after=0;

    const light_spot_goal = new THREE.SpotLight(0xFBE5D0, 1, 10000, Math.PI / 4, 10, 0.6);
    light_spot_goal.position.set( 0, 18000, 0 );
    light_spot_goal.lookAt( 0, 8000, 0 );
    light_spot_goal.castShadow = true;
    scene.add(light_spot_goal);

    // 初回実行
    tick();
    

    function tick() {
        date_before = new Date();
        controls.update();

        // A 左回り
        // D 右回り
        // W 前進
        // Z 後退
        // S 停止
        // K 上をむく
        // J 下をむく
        // E 目線と並行にする
        diffX = cameraLookX - cameraPositionX;
        diffY = cameraLookY - cameraPositionY;
        diffZ = cameraLookZ - cameraPositionZ;

        switch(keyCode){
            case 75:
                // K 上移動
                phi = Math.asin(diffY/20);
                cameraLookX = cameraPositionX + diffX*Math.cos(phi+1/22)/Math.cos(phi);
                cameraLookY = cameraPositionY + 20*(Math.sin(phi+1/22));
                cameraLookZ = cameraPositionZ + diffZ * Math.cos(phi+1/22)/Math.cos(phi);
                break;
            case 74:
                // J 下移動
                phi = Math.asin(diffY/20);
                cameraLookX = cameraPositionX + diffX*Math.cos(phi-1/22)/Math.cos(phi);
                cameraLookY = cameraPositionY + 20*(Math.sin(phi-1/22));
                cameraLookZ = cameraPositionZ + diffZ * Math.cos(phi-1/22)/Math.cos(phi);
                break;
            case 69:
                // E 目線と並行
                cameraLookX = cameraPositionX + 20*diffX/(Math.sqrt(diffX*diffX + diffZ * diffZ));
                cameraLookY = cameraPositionY;
                cameraLookZ = cameraPositionZ + 20*diffZ/(Math.sqrt(diffX*diffX + diffZ * diffZ));
                break;
            case 68:
                // D 右回り
                distance = Math.sqrt(diffX*diffX + diffZ * diffZ);
                cameraLookX = cameraPositionX + 20*(diffX * Math.cos(1/40) - diffZ * Math.sin(1/40))/distance;
                cameraLookZ = cameraPositionZ + 20*(diffX * Math.sin(1/40) + diffZ * Math.cos(1/40))/distance;
                break;
            case 65:
                // A 左回り
                distance = Math.sqrt(diffX*diffX + diffZ * diffZ);
                cameraLookX = cameraPositionX + 20*(diffX * Math.cos(-1/40) - diffZ * Math.sin(-1/40))/distance;
                cameraLookZ = cameraPositionZ + 20*(diffX * Math.sin(-1/40) + diffZ * Math.cos(-1/40))/distance;
                break;
            case 87:
                // W 前進
                cameraPositionX = cameraPositionX + diffX;
                cameraPositionY = cameraPositionY + diffY;
                cameraPositionZ = cameraPositionZ + diffZ;
                cameraLookX = cameraLookX + diffX;
                cameraLookY = cameraLookY + diffY;
                cameraLookZ = cameraLookZ + diffZ;
                break;
            case 90:
                // Z 後退
                cameraPositionX = cameraPositionX - diffX*1/2;
                cameraPositionY = cameraPositionY - diffY*1/2;
                cameraPositionZ = cameraPositionZ - diffZ*1/2;
                cameraLookX = cameraLookX - diffX*1/2;
                cameraLookY = cameraLookY - diffY*1/2;
                cameraLookZ = cameraLookZ - diffZ*1/2;
                break;
            case 82:
                // R スタートに戻る
                cameraPositionX = 0;
                cameraPositionY = -10400;
                cameraPositionZ = -20;
                cameraLookX = 0;
                cameraLookY = -10400;
                cameraLookZ = 0;
                break;
            case 83:
                // ストップ
                break;
            case 70:
                // 上に上がっていく
                let distanceFromCenter = cameraPositionX*cameraPositionX + cameraPositionZ*cameraPositionZ;
                if(distanceFromCenter<2250000 && floor ==1){
                    if(cameraPositionY<1300){
                        cameraPositionX=0;
                        cameraPositionY+=30;
                        cameraPositionZ=0;
                    }else{
                        cameraLookY=cameraPositionY=300;
                        cameraPositionX=-3868;
                        cameraPositionZ=-2925;
                        cameraLookX=-3850;
                        cameraLookZ=-2935;
                        floor=2;
                    }
                }else if(distanceFromCenter<2250000 && floor ==2){
                    if(cameraPositionY <9300){
                        cameraPosition=0;
                        cameraPositionY+=30;
                        cameraPositionZ=0;
                    }else{
                        cameraLookY=cameraPositionY;
                        cameraPositionX=-816;
                        cameraPositionZ=-2650;
                        cameraLookX=-805;
                        cameraLookZ=-2633;
                        floor=3;
                    }
                }else if(distanceFromCenter<2250000 && floor ==3){
                    if(cameraPositionY <15020){
                        cameraPosition=0;
                        cameraPositionY+=30;
                        cameraPositionZ=0;
                    }else{
                        cameraLookY=cameraPositionY;
                        cameraPositionX=0;
                        cameraPositionZ=0;
                        cameraLookX=-20;
                        cameraLookZ=0;
                        floor=4;
                    }
                }
                break;
            case 71:
                //オブジェクトの近くに来てGを押すとオブジェクトを集める
                for(i=0; i<number_of_objects; i++){
                    if(Math.abs(cameraPositionY-model_loaded[i].position.y)<1000){
                        if(Math.abs(cameraPositionX-model_loaded[i].position.x)<1000 && Math.abs(cameraPositionZ-model_loaded[i].position.z)<1000){
                            console.log("get object"+i);
                            if((i>3&&i<10) || (i>17&&i<24) || (i>31&&i<41) || (i>52&&i<60)){
                                scale_x = model_loaded[i].scale.x;
                                scale_y = model_loaded[i].scale.y;
                                scale_z = model_loaded[i].scale.z;
                                console.log(scale_x);
                                console.log("index.js sensor" + sum_values);
                                // console.log("pressure=" +pressure_value);
                                // console.log("temperature=" + temperature_sensor_value);
                                // console.log("ax=" + ax_value);
                                if(scale_x > 0 && scale_y>0 && scale_z >0){
                                    if(i==5 || i==8 || i==19 || i==22 || i==33 || i==36 || i==39){
                                        if(sum_values[0]>0){
                                            // 光が500超えたらいいようにする
                                            scale_x = scale_y = scale_z = (200 - sum_values[0]/2.5) * 0.6;
                                        }
                                    }else if(i>52&&i<60){
                                        //圧力が200より小さくなったらいいようにする
                                        if(sum_values[1]!=0){
                                            scale_y = (200 - (1023 - sum_values[1])/4) * 0.6;
                                        }
                                    }else if(i==4 || i==7 || i==18 || i==21 || i==32 || i==35 || i==38){
                                        //温度が25℃よりも高かったらいいようにする
                                        if(sum_values[2]<=100 && sum_values[2]!=0){
                                            scale_x = scale_y = scale_z = (200 - (sum_values[2]-20)*40) * 0.6;
                                        }
                                    }else if(i==6 || i==9 || i==20 || i==23 || i==34 || i==37 || i==40){
                                        if(sum_values[3]!=0){
                                            //axが8以上になったらいいようにする
                                            scale_x = scale_y = scale_z = (200 - sum_values[3]*12 -100) * 0.6;
                                        }
                                    }
                                    if(scale_y>0){
                                        meter_value.style.backgroundColor = "#fd7e00";
                                        meter_value.style.height=(200-scale_y)+"px";
                                    }else{
                                        meter_value.style.height=200+"px";
                                        meter_value.style.backgroundColor = "#ff0000";
                                    }
                                    console.log("set_scale = "+ scale_y);
                                    model_loaded[i].scale.set(scale_x, scale_y, scale_z);
                                }else{
                                    is_target_destroyed = true;
                                    model_loaded[i].scale.set(0, 0, 0);
                                    
                                }
                            }
                        }
                    }
                }
                break;
            case 72:
                //風船の近くに来てHを押すと風船がこっちにくる
                for(i=0; i<number_of_objects; i++){
                    if(Math.abs(cameraPositionY-model_loaded[i].position.y)<1000){
                        if(Math.abs(cameraPositionX-model_loaded[i].position.x)<1000 && Math.abs(cameraPositionZ-model_loaded[i].position.z)<1000){
                            console.log("get object"+i);
                            if((i>9&&i<18) || (i>23&&i<32) || (i>40&&i<53) ){
                                pos_x = model_loaded[i].position.x - (model_loaded[i].position.x-cameraPositionX)/10;
                                pos_y = model_loaded[i].position.y - (model_loaded[i].position.y-cameraPositionY)/10;
                                pos_z = model_loaded[i].position.z - (model_loaded[i].position.z-cameraPositionZ)/10;
                                if(model_loaded[i].position.x-cameraPositionX>200 && is_target_destroyed){
                                    model_loaded[i].position.set(pos_x, pos_y, pos_z);
                                }else if(is_target_destroyed){
                                    meter_value.style.height=0+"px";
                                    meter_value.style.backgroundColor = "#fd7e00";
                                    model_loaded[i].scale.set(0, 0, 0);
                                    is_target_destroyed = false;
                                    if(i%4 == 0){
                                        blue_balloon_number+=1;
                                        blue_balloon_paragraph.innerHTML=blue_balloon_number;
                                    }else if(i%4 == 1){
                                        pink_balloon_number+=1;
                                        pink_balloon_paragraph.innerHTML=pink_balloon_number;
                                    }else if(i%4 == 2){
                                        green_balloon_number+=1;
                                        green_balloon_paragraph.innerHTML=green_balloon_number;
                                    }else if(i%4 == 3){
                                        yellow_balloon_number+=1;
                                        yellow_balloon_paragraph.innerHTML=yellow_balloon_number;
                                    }
                                }
                                
                            }
                        }
                    }
                }
                break;
            case 80:
                //ハブの近くでPを押すと地図が表示されてワープできる、選択方法はPを押して選択、エンターで確定
                if(Math.abs(cameraPositionY+10600)<1000){
                    //1階にいる場合
                    if(map_state){
                        if(click_time==1){
                            if(cameraPositionX > -4800 && cameraPositionX < -3300 && cameraPositionZ > -8500 && cameraPositionZ < -7000){
                                //赤にいる時
                                choose = 3;
                            }else if(cameraPositionX > 5900 && cameraPositionX < 7400 && cameraPositionZ > -6600 && cameraPositionZ < -5100){
                                //オレンジにいる時
                                choose = 2;
                            }else if(cameraPositionX > 6900 && cameraPositionX < 8400 && cameraPositionZ > 3400 && cameraPositionZ < 4900){
                                //黄色にいる時
                                choose = 1;
                            }else if(cameraPositionX > -850 && cameraPositionX < 500 && cameraPositionZ > 8300 && cameraPositionZ < 9800){
                                //緑にいる時
                                choose = 5;
                            }else if(cameraPositionX > -9500 && cameraPositionX < -8000 && cameraPositionZ > 1000 && cameraPositionZ < 2500){
                                //青にいる時
                                choose = 4;
                            }

                            if(choose){
                                place = choose + 9;
                                eval("current_pos = choose_"+place);
                                current_pos.style.display="block";
                                console.log("地図の場所は"+place);
                            }
                        }else{
                            if(choose){
                                place_before = (choose+click_time-3)%5 + 10;
                                eval("before_pos = choose_"+place_before);
                                before_pos.style.display = "none";
                                place = (choose+click_time-2)%5 + 10;
                                eval("current_pos = choose_"+place);
                                current_pos.style.display="block";
                                console.log("地図の場所は"+place)
                            }
                        }
                    }else{
                        first_floor_map.style.display= "block";
                        map_state=true;
                    }
                }else if(Math.abs(cameraPositionY-280)<1000){
                    //2階にいる場合
                    if(map_state){
                        if(click_time==1){
                            if(cameraPositionX > 3700 && cameraPositionX < 4300 && cameraPositionZ > 0 && cameraPositionZ < 700){
                                //左上にいる時、choose_7
                                choose = 1;
                            }else if(cameraPositionX > 2400 && cameraPositionX < 3000 && cameraPositionZ > 2600 && cameraPositionZ < 3200){
                                //右上にいる時、choose_8
                                choose = 2;
                            }else if(cameraPositionX > -4400 && cameraPositionX < -3800 && cameraPositionZ > -2300 && cameraPositionZ < -1600){
                                //下にいる時、choose_9
                                choose = 3;
                            }

                            if(choose){
                                place = choose + 6;
                                eval("current_pos = choose_"+place);
                                current_pos.style.display="block";
                                console.log("地図の場所は"+place);
                            }
                        }else{
                            if(choose){
                                place_before = (choose+click_time-3)%3 + 7;
                                eval("before_pos = choose_"+place_before);
                                before_pos.style.display = "none";
                                place = (choose+click_time-2)%3 + 7;
                                eval("current_pos = choose_"+place);
                                current_pos.style.display="block";
                                console.log("地図の場所は"+place)
                            }
                        }
                    }else{
                        second_floor_map.style.display= "block";
                        map_state=true;
                    }
                }else if(Math.abs(cameraPositionY-9300)<1000){
                    //3階にいる場合
                    if(map_state){
                        if(click_time==1){
                            if(cameraPositionX > -3500 && cameraPositionX < -2900 && cameraPositionZ > -200 && cameraPositionZ < 400){
                                //青にいる時
                                choose = 1;
                            }else if(cameraPositionX > -1900 && cameraPositionX < -1300 && cameraPositionZ > -3100 && cameraPositionZ < -2500){
                                //薄青にいる時
                                choose = 2;
                            }else if(cameraPositionX > 1500 && cameraPositionX < 2100 && cameraPositionZ > -2700 && cameraPositionZ < -3300){
                                //青緑にいる時
                                choose = 2;
                            }else if(cameraPositionX > 3200 && cameraPositionX < 3800 && cameraPositionZ > -300 && cameraPositionZ < 300){
                                //グレーにいる時
                                choose = 4;
                            }else if(cameraPositionX > 1500 && cameraPositionX < 2100 && cameraPositionZ > 2500 && cameraPositionZ < 3100){
                                //紫にいる時
                                choose = 5;
                            }else if(cameraPositionX > -1000 && cameraPositionX < -1600 && cameraPositionZ > 2600 && cameraPositionZ < 3200){
                                //青紫にいる時
                                choose = 6;
                            }

                            if(choose){
                                place = choose;
                                eval("current_pos = choose_"+place);
                                current_pos.style.display="block";
                                console.log("地図の場所は"+place);
                            }
                        }else{
                            if(choose){
                                place_before = (choose+click_time-3)%6 + 1;
                                eval("before_pos = choose_"+place_before);
                                before_pos.style.display = "none";
                                place = (choose+click_time-2)%6 + 1;
                                eval("current_pos = choose_"+place);
                                current_pos.style.display="block";
                                console.log("地図の場所は"+place)
                            }
                        }
                    }else{
                        third_floor_map.style.display= "block";
                        map_state=true;
                    }
                }
                break;
            case 13:
                first_floor_map.style.display= "none";
                second_floor_map.style.display = "none";
                third_floor_map.style.display = "none";
                if(current_pos){
                    current_pos.style.display="none";
                    console.log("現在地は"+place);
                    cameraPositionX = warp_x[place-1];
                    cameraPositionZ = warp_z[place-1];
                    let distanceFromCenter = Math.sqrt(cameraPositionX*cameraPositionX + cameraPositionZ*cameraPositionZ);
                    cameraLookX = cameraPositionX*(distanceFromCenter-20)/distanceFromCenter;
                    cameraLookZ = cameraPositionZ*(distanceFromCenter-20)/distanceFromCenter;
                }
                map_state=false;
                click_time=0;
        }

        camera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
        controls.target.set(cameraLookX, cameraLookY, cameraLookZ); 

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
        // console.log('ticking');
        console.log('x='+cameraPositionX);
        console.log('z='+cameraPositionZ);
        // console.log("処理時間(tick間)＝"+(date_before-date_after));
        date_after = new Date();
        //console.log("処理時間(tick内)＝"+(date_after.getMilliseconds()-date_before.getMilliseconds()));
    }
}