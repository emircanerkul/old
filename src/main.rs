use magick_rust::{
    bindings::{CompositeOperator_ColorBurnCompositeOp, CompositeOperator_OverCompositeOp, FilterType_GaussianFilter}, magick_wand_genesis, DrawingWand, MagickWand, PixelWand
};
use std::sync::Once;

use rand::{distributions::Alphanumeric, Rng};

/// Quality used when writing the WebP output (1-100, lower means smaller file).
const WEBP_QUALITY: usize = 60;

struct Box {
    x: i32,
    y: i32,
}

fn generate_random_coordinates(canvas_width: i32, canvas_height: i32, box_size: usize) -> Vec<Box> {
    let mut rng = rand::thread_rng();
    let mut boxes = Vec::new();

    while boxes.len() < 12 {
        let x = rng.gen_range(30..(canvas_width - 180));
        let y = rng.gen_range(30..(canvas_height - 180));

        let new_box = Box { x, y };
        if !boxes
            .iter()
            .any(|existing_box| overlap(&new_box, existing_box, box_size + 50))
        {
            boxes.push(new_box);
        }
    }

    boxes
}

fn overlap(box1: &Box, box2: &Box, box_size: usize) -> bool {
    (box1.x - box2.x).abs() < box_size.try_into().unwrap()
        && (box1.y - box2.y).abs() < box_size.try_into().unwrap()
}

// Used to make sure MagickWand is initialized exactly once. Note that we
// do not bother shutting down, we simply exit when we're done.
static START: Once = Once::new();

fn main() {
    START.call_once(|| {
        magick_wand_genesis();
    });
    let box_size: usize = 100;

    let mut bg_wand: MagickWand = MagickWand::new();
    let _ = bg_wand.read_image("assets/parchments/2.webp");

    let mut img_wand: MagickWand = MagickWand::new();
    let _ = img_wand.read_image("input.webp");

    let (original_width, original_height) = (
        img_wand.get_image_width() as f32,
        img_wand.get_image_height() as f32,
    );

    let new_width = 1200.0;
    let new_height = (original_height / original_width) * new_width;
    
    img_wand.resize_image(
        new_width as usize,
        new_height as usize,
        FilterType_GaussianFilter,
    );

    let mut black_wand = PixelWand::new();
    let _ = black_wand.set_color("black");
    let mut white_wand = PixelWand::new();
    let _ = white_wand.set_color("white");
    let mut draw_wand = DrawingWand::new();

    // Create a soft edge mask
    let mut mask_wand: MagickWand = MagickWand::new();
    let _ = mask_wand.new_image(new_width as usize, new_height as usize,&PixelWand::new());
    draw_wand.set_fill_color(&black_wand);
    draw_wand.set_stroke_color(&white_wand);
    draw_wand.set_stroke_width(140.0);
    draw_wand.draw_rectangle(20.0,20.0,new_width.into(), new_height.into());
    let _ = mask_wand.draw_image(&draw_wand);
    let _ = mask_wand.blur_image(100.0, 100.0);
    let _ = img_wand.compose_images(&mask_wand, 3, true, 0, 0);

    let mut drawing_wand: DrawingWand = DrawingWand::new();
    drawing_wand.set_font_size(64.0);
    drawing_wand.set_fill_color(&white_wand);

    let coordinates = generate_random_coordinates(new_width as i32, new_height as i32, box_size);

    for (index, coordinate) in coordinates.iter().enumerate() {
        let cutter_wand: MagickWand = img_wand.clone();
        let _ = cutter_wand.border_image(&white_wand, 5, 5, 2);
        let _ = cutter_wand.crop_image(
            box_size,
            box_size,
            coordinate.x as isize,
            coordinate.y as isize,
        );

        let _ = bg_wand.compose_images(
            &cutter_wand,
            CompositeOperator_OverCompositeOp,
            true,
            400 + (index as isize) % 6 * 150,
            1850 + (index as isize) / 6 * 150,
        );
        let _ = bg_wand.annotate_image(&drawing_wand, (400 + (index % 6) * 150) as f64, (1900 + (index / 6) * 150) as f64, 10.0, (index + 1).to_string().as_str());
        let _ = cutter_wand.blur_image(100.0, 100.0);
        let _ = cutter_wand.border_image(&white_wand, 5, 5, 2);
        let _ = img_wand.compose_images(
            &cutter_wand,
            CompositeOperator_OverCompositeOp,
            true,
            coordinate.x as isize,
            coordinate.y as isize,
        );

        let s: String = rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(1)
        .map(char::from)
        .collect();
        let _ = img_wand.annotate_image(&drawing_wand, coordinate.x as f64 + 10.0, coordinate.y as f64+60.0, 0.0, &s);
    }

    let _ = bg_wand.compose_images(
        &img_wand,
        CompositeOperator_ColorBurnCompositeOp,
        true,
        250,
        200,
    );

    // Write a compressed WebP: explicit format + quality + slowest/best method.
    let _ = bg_wand.set_image_format("webp");
    let _ = bg_wand.set_image_compression_quality(WEBP_QUALITY);
    let _ = bg_wand.set_option("webp:method", "6");
    let _ = bg_wand.write_image("./output.webp");
}
