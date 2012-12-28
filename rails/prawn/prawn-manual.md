Prawn Manual
=====

Please refer to the directions on the Prawn site.  If you encounter issues, see my notes below for one possible solution.

1. [Generate the Prawn user manual](https://github.com/prawnpdf/prawn#manual)
2. [Using Prawn in Rails 3+ (a little out of date, but workable)](https://github.com/prawnpdf/prawn/wiki/Using-Prawn-in-Rails-3)


Problems? One possible solution
=====

1. When generating the manual, I encountered a strange error relating to compression:

```
Davids-iMac:prawn davidvezzani$ bundle exec rake manual
Building manual...
rake aborted!
Cannot add data to a stream that is compressed
/Users/davidvezzani/rails-app/prawn/lib/prawn/core/reference.rb:36:in `<<'
/Users/davidvezzani/rails-app/prawn/lib/prawn/document/internals.rb:58:in `add_content'
/Users/davidvezzani/rails-app/prawn/lib/prawn/document/graphics_state.rb:102:in `close_graphics_state'
/Users/davidvezzani/rails-app/prawn/lib/prawn/document/graphics_state.rb:121:in `restore_graphics_state'
/Users/davidvezzani/rails-app/prawn/lib/prawn/document/internals.rb:111:in `block in finalize_all_page_contents'
/Users/davidvezzani/rails-app/prawn/lib/prawn/document/internals.rb:107:in `each'
/Users/davidvezzani/rails-app/prawn/lib/prawn/document/internals.rb:107:in `finalize_all_page_contents'
/Users/davidvezzani/rails-app/prawn/lib/prawn/document.rb:361:in `render'
/Users/davidvezzani/rails-app/prawn/lib/prawn/document.rb:378:in `block in render_file'
/Users/davidvezzani/rails-app/prawn/lib/prawn/document.rb:378:in `open'
/Users/davidvezzani/rails-app/prawn/lib/prawn/document.rb:378:in `render_file'
/Users/davidvezzani/rails-app/prawn/lib/prawn/document.rb:123:in `generate'
/Users/davidvezzani/rails-app/prawn/manual/manual/manual.rb:11:in `<top (required)>'
/Users/davidvezzani/rails-app/prawn/Rakefile:42:in `require'
/Users/davidvezzani/rails-app/prawn/Rakefile:42:in `block in <top (required)>'
Tasks: TOP => manual
(See full trace by running task with --trace)
```

I chased down the issue to [prawn]/manual/manual/manual.rb:

```ruby
Prawn::Example.generate("manual.pdf",
                        :optimize_objects => true,
                        :compress => true,
                        :skip_page_creation => true,
                        :page_size => "FOLIO") do
  
  load_page "cover"
  load_page "foreword"
  load_page "how_to_read_this_manual"
  # 
  # Core chapters
  load_package "basic_concepts"
  load_package "graphics"
  load_package "text"
  load_package "bounding_box"
  # 
  # # Remaining chapters
  load_package "layout"
  load_package "images"
  load_package "table"
  load_package "document_and_page_options"
  load_package "outline"
  load_package "repeatable_content"
  load_package "templates"                    # <<<<
  load_package "security"
end
```

I haven't further investigated, but apparently there is something in the 'templates' package that is attempting to reopen a stream that has already been compressed.  This seems strange since I believe the concept behind compress is to perform compression *after* the block has been executed.

To resolve the issue so I can view the manual, I simply turned off compression:

```ruby
Prawn::Example.generate("manual.pdf",
                        :optimize_objects => true,
                        :compress => false,           # <<<<
                        :skip_page_creation => true,
                        :page_size => "FOLIO") do
  ...
end
```


