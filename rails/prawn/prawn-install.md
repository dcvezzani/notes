Prawn Installation
=====

Please refer to the directions on the Prawn site.  If you encounter issues, see my notes below for one possible solution.

2. [Using Prawn in Rails 3+ (a little out of date, but workable)](https://github.com/prawnpdf/prawn/wiki/Using-Prawn-in-Rails-3)


Problems? Here are some ideas
=====

There's no such thing as ```config.load_paths``` anymore; it's ```config.autoload_paths``` now.  Furthermore, if you're using bundler, you won't need to include prawn paths in the Rails ```config.autoload_paths```.  Prawn seems to run just fine in the path controlled by the associated bundler Gemfile.

```ruby
config.load_paths << "#{RAILS_ROOT}/vendor/prawn/lib"
```

If you decide to use the ```prawnto_2``` gem, you shouldn't need to create the ```app/reports``` directory or include it in the ```config.autoload_paths```.  It wouldn't hurt to include it either.

The Rails 3+ ```Mime::Type``` should already include support for the .pdf extension.  If it is included, you don't need to update your ```config/initializers/mime_types.rb``` file.  You can verify this in the Rails console:

```ruby
Mime::Type.lookup_by_extension("pdf")
```

Finally, running the simple test failed for me the first time due to encoding issues.

```
1.9.3-p194 :004 > File.open("test.pdf", "w"){|f| f.write(HelloReport.new.to_pdf)}
Encoding::UndefinedConversionError: "\xFF" from ASCII-8BIT to UTF-8
	from (irb):4:in `write'
	from (irb):4:in `block in irb_binding'
	from (irb):4:in `open'
	from (irb):4
	from /Users/davidvezzani/.rvm/gems/ruby-1.9.3-p194@rails328/gems/railties-3.2.8/lib/rails/commands/console.rb:47:in `start'
	from /Users/davidvezzani/.rvm/gems/ruby-1.9.3-p194@rails328/gems/railties-3.2.8/lib/rails/commands/console.rb:8:in `start'
	from /Users/davidvezzani/.rvm/gems/ruby-1.9.3-p194@rails328/gems/railties-3.2.8/lib/rails/commands.rb:41:in `<top (required)>'
	from script/rails:6:in `require'
	from script/rails:6:in `<main>'
```

Thanks to [knut](http://stackoverflow.com/users/676874/knut) and the [related post](http://stackoverflow.com/questions/13003287/encodingundefinedconversionerror), I was able to make the necessary change to process the pdf with the desired encoding:

### from

```ruby
class HelloReport < Prawn::Document
  def to_pdf
    text "Hello world"
    render
  end
end
```

### to

```ruby
# test to verify Prawn was installed correctly
class HelloReport < Prawn::Document
  def to_pdf
    text "Hello world"
    (render).force_encoding('utf-8')      # <<<
  end
end
```

