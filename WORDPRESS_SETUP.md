# Headless WordPress Backend Setup Guide

This guide details how to set up and configure your WordPress instance as a headless CMS backend for the **Identifyyou** Next.js website.

## Required Plugins

Install and activate the following plugins from the WordPress Plugin Directory:

1. **Advanced Custom Fields (ACF)** (Free or Pro) - To create custom fields for post types.
2. **Custom Post Type UI (CPT UI)** (Optional, or register via `functions.php`) - For easily registering Custom Post Types.
3. **Contact Form 7 (CF7)** - For handling form submissions via REST API.
4. **WP REST API Cache** (Optional) - Highly recommended for improved query speeds.

---

## 1. Register Custom Post Types (CPT)

Using **CPT UI** (or in your theme's `functions.php`), register the following Custom Post Types. 

> [!IMPORTANT]
> Ensure **"Show in REST API"** is set to **True** for each post type. This is required to make them queryable via `/wp-json/wp/v2/`.

### Custom Post Type Definitions

| Post Type Name | Post Type Slug | REST Base | Supports |
| :--- | :--- | :--- | :--- |
| **Case Studies** | `case-studies` | `case-studies` | Title, Editor, Thumbnail, Revisions, Excerpt |
| **Solutions** | `solutions` | `solutions` | Title, Editor, Thumbnail, Revisions |
| **Gallery** | `gallery` | `gallery` | Title, Thumbnail |
| **Edge Computing Projects** | `edge-projects` | `edge-projects` | Title, Editor, Thumbnail |

---

## 2. Advanced Custom Fields (ACF) Configuration

Create Field Groups in **ACF** and assign them to the respective Custom Post Types. 

> [!IMPORTANT]
> In the ACF Field Group settings, go to the **Presentation** tab and ensure **"Show in REST API"** is set to **True** so that ACF fields appear in the JSON responses.

### A. Case Studies Field Group (Assign to CPT `case-studies`)
* **Client Name** (`client_name`): Text
* **Project Date** (`project_date`): Text or Date Picker
* **Technologies Used** (`technologies_used`): Text (comma-separated, e.g., "Snowflake, Power BI, React")
* **Case Study Link** (`case_study_link`): Text (optional custom URL fallback)

### B. Solutions Field Group (Assign to CPT `solutions`)
* **Solution Icon** (`solution_icon`): Text (CSS/FontAwesome class name or URL, e.g., `fas fa-laptop-code`)
* **Features List** (`features_list`): Text Area (new line separated list)
* **Button Text** (`button_text`): Text (defaults to "View Details")
* **Button Link** (`button_link`): Text (defaults to `#`)

### C. Gallery Field Group (Assign to CPT `gallery`)
* **Gallery Images** (`gallery_images`): Gallery field (returns Image array or Image IDs/URLs).

### D. Edge Projects Field Group (Assign to CPT `edge-projects`)
* **Project Hardware** (`project_hardware`): Text (e.g., "Fluke Thermalert T40")
* **Project Location** (`project_location`): Text
* **Project Status** (`project_status`): Select/Text (e.g., "Active", "Completed")

---

## 3. Contact Form Submission (CF7)

1. Create a form in **Contact Form 7** and note its ID (e.g., `123`).
2. Add the following fields to your form template matching the React frontend:
   * `first-name`
   * `last-name`
   * `your-email`
   * `your-message`
3. The frontend will submit POST requests directly to:
   `[WP_API_URL]/contact-form-7/v1/contact-forms/[FORM_ID]/feedback`
4. Form data should be sent as `FormData` or URL-encoded keys:
   * `first-name`
   * `last-name`
   * `your-email`
   * `your-message`

---

## 4. Enabling CORS and REST API Customizations

Add the following helper functions to your WordPress active theme's `functions.php` file to handle CORS headers and allow options requests:

```php
// Allow CORS requests from frontend hostnames
function add_cors_http_headers() {
    header("Access-Control-Allow-Origin: *"); // Update in production to your specific frontend URL
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if ( 'OPTIONS' == $_SERVER['REQUEST_METHOD'] ) {
        status_header(200);
        exit();
    }
}
add_action('init', 'add_cors_http_headers');
```

---

## 5. Fetching Content in Next.js

Verify access by visiting the REST endpoints directly in your browser:
* Pages: `https://your-wp-domain.com/wp-json/wp/v2/pages`
* Posts: `https://your-wp-domain.com/wp-json/wp/v2/posts`
* Case Studies: `https://your-wp-domain.com/wp-json/wp/v2/case-studies`
* Solutions: `https://your-wp-domain.com/wp-json/wp/v2/solutions`
* Gallery: `https://your-wp-domain.com/wp-json/wp/v2/gallery`
* Edge Projects: `https://your-wp-domain.com/wp-json/wp/v2/edge-projects`
